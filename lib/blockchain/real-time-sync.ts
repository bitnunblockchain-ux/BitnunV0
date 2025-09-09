"use client"

import { createClient } from "@/lib/supabase/client"
import { getEnhancedBlockchainNode } from "./enhanced-wasm-node"

interface SyncEvent {
  type: "balance_update" | "transaction_confirmed" | "mining_reward" | "node_status"
  data: any
  timestamp: number
}

class RealTimeBlockchainSync {
  private supabase = createClient()
  private blockchainNode = getEnhancedBlockchainNode()
  private userId: string | null = null
  private walletAddress: string | null = null
  private syncInterval: NodeJS.Timeout | null = null
  private eventListeners: Map<string, Function[]> = new Map()

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeSync()
    }
  }

  setUser(userId: string, walletAddress: string) {
    this.userId = userId
    this.walletAddress = walletAddress
    this.blockchainNode.setUserId(userId)
    this.blockchainNode.setWalletAddress(walletAddress)

    // Start real-time synchronization
    this.startSync()
  }

  private initializeSync() {
    this.supabase
      .channel("blockchain_events")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "transactions" }, (payload) =>
        this.handleTransactionEvent(payload),
      )
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "btn_balances" }, (payload) =>
        this.handleBalanceUpdate(payload),
      )
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "mining_sessions" }, (payload) =>
        this.handleMiningEvent(payload),
      )
      .subscribe()

    console.log("[v0] Real-time blockchain sync initialized")
  }

  private startSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
    }

    this.syncInterval = setInterval(async () => {
      await this.syncNodeWithDatabase()
    }, 5000)

    console.log("[v0] Started real-time blockchain synchronization")
  }

  private async syncNodeWithDatabase() {
    if (!this.userId || !this.walletAddress) return

    try {
      // Get current node balance
      const nodeBalance = this.blockchainNode.getBalance()
      const nodeStats = this.blockchainNode.getNetworkStats()

      // Sync balance with database
      const { error: syncError } = await this.supabase.rpc("sync_wallet_with_node", {
        p_user_id: this.userId,
        p_wallet_address: this.walletAddress,
        p_node_balance: nodeBalance,
      })

      if (syncError) {
        console.error("[v0] Balance sync error:", syncError)
      }

      // Log node activity
      await this.supabase.rpc("log_node_activity", {
        p_node_id: nodeStats.nodeId,
        p_activity_type: "health_check",
        p_activity_data: {
          peers_connected: nodeStats.peersConnected,
          blocks_in_chain: nodeStats.blocksInChain,
          hash_rate: nodeStats.hashRate,
          mining_active: nodeStats.miningActive,
        },
      })

      // Emit sync event
      this.emit("node_status", {
        nodeStats,
        balance: nodeBalance,
        synced: true,
      })
    } catch (error) {
      console.error("[v0] Sync error:", error)
      this.emit("sync_error", { error })
    }
  }

  private handleTransactionEvent(payload: any) {
    const transaction = payload.new

    if (transaction.status === "confirmed" && transaction.to_address === this.walletAddress) {
      this.emit("balance_update", {
        amount: transaction.amount,
        type: transaction.transaction_type,
        txHash: transaction.tx_hash,
      })
    }

    this.emit("transaction_confirmed", transaction)
  }

  private handleBalanceUpdate(payload: any) {
    const balance = payload.new

    if (balance.wallet_address === this.walletAddress) {
      this.emit("balance_update", {
        availableBalance: balance.available_balance,
        stakedBalance: balance.staked_balance,
        totalEarned: balance.total_earned,
      })
    }
  }

  private handleMiningEvent(payload: any) {
    const session = payload.new

    if (session.user_id === this.userId) {
      this.emit("mining_reward", {
        sessionId: session.id,
        reward: session.btn_earned,
        sessionType: session.session_type,
      })
    }
  }

  // Event system for real-time updates
  on(event: string, callback: Function) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, [])
    }
    this.eventListeners.get(event)!.push(callback)
  }

  off(event: string, callback: Function) {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      const index = listeners.indexOf(callback)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }

  private emit(event: string, data: any) {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      listeners.forEach((callback) => callback(data))
    }
  }

  // Manual sync methods
  async forceSync() {
    await this.syncNodeWithDatabase()
  }

  async updateTransactionStatus(txHash: string, status: string, blockNumber?: number, gasUsed?: number) {
    const { data, error } = await this.supabase.rpc("update_transaction_status", {
      p_tx_hash: txHash,
      p_status: status,
      p_block_number: blockNumber,
      p_gas_used: gasUsed,
    })

    if (error) {
      console.error("[v0] Transaction status update error:", error)
      return false
    }

    return data
  }

  async getBlockchainStats() {
    const { data, error } = await this.supabase.rpc("get_blockchain_stats")

    if (error) {
      console.error("[v0] Blockchain stats error:", error)
      return null
    }

    return data
  }

  // Cleanup
  destroy() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
    }

    this.supabase.removeAllChannels()
    this.eventListeners.clear()

    console.log("[v0] Real-time blockchain sync destroyed")
  }
}

// Singleton instance
let realTimeSyncInstance: RealTimeBlockchainSync | null = null

export const getRealTimeSync = (): RealTimeBlockchainSync => {
  if (typeof window === "undefined") {
    return new RealTimeBlockchainSync()
  }

  if (!realTimeSyncInstance) {
    realTimeSyncInstance = new RealTimeBlockchainSync()
  }
  return realTimeSyncInstance
}

export { RealTimeBlockchainSync }
