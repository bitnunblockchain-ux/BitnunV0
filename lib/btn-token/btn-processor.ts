import { createClient } from "@/lib/supabase/client"

export interface BTNOperation {
  type: "mint" | "burn" | "transfer" | "stake" | "unstake" | "reward"
  amount: number
  from?: string
  to?: string
  metadata?: any
}

export interface StakingPosition {
  id: string
  poolId: string
  stakedAmount: number
  rewardsEarned: number
  stakeDate: string
  unlockDate?: string
  status: "active" | "unstaking" | "completed"
}

export interface GovernanceProposal {
  id: string
  title: string
  description: string
  type: string
  votesFor: number
  votesAgainst: number
  votesAbstain: number
  status: "active" | "passed" | "rejected" | "expired"
  votingEnd: string
}

class BTNTokenProcessor {
  private supabase = createClient()
  private userId: string | null = null
  private walletAddress: string | null = null

  setUser(userId: string, walletAddress: string) {
    this.userId = userId
    this.walletAddress = walletAddress
  }

  // Token Operations
  async mintTokens(amount: number, recipient: string, metadata: any = {}): Promise<string> {
    if (!this.userId) throw new Error("User not authenticated")

    const operation: BTNOperation = {
      type: "mint",
      amount,
      to: recipient,
      metadata,
    }

    const txHash = this.generateTxHash()

    // Record operation in database
    const { error } = await this.supabase.from("btn_operations").insert({
      user_id: this.userId,
      operation_type: operation.type,
      amount: operation.amount,
      to_address: operation.to,
      tx_hash: txHash,
      status: "confirmed",
      metadata: operation.metadata,
    })

    if (error) throw error

    // Update user balance
    await this.updateBalance(recipient, amount, "add")

    // Update tokenomics
    await this.updateTokenomics("mint", amount)

    console.log(`[BTN] Minted ${amount} BTN to ${recipient}`)
    return txHash
  }

  async burnTokens(amount: number, from: string): Promise<string> {
    if (!this.userId) throw new Error("User not authenticated")

    // Check balance
    const balance = await this.getBalance(from)
    if (balance < amount) throw new Error("Insufficient balance")

    const operation: BTNOperation = {
      type: "burn",
      amount,
      from,
    }

    const txHash = this.generateTxHash()

    const { error } = await this.supabase.from("btn_operations").insert({
      user_id: this.userId,
      operation_type: operation.type,
      amount: operation.amount,
      from_address: operation.from,
      tx_hash: txHash,
      status: "confirmed",
    })

    if (error) throw error

    await this.updateBalance(from, amount, "subtract")
    await this.updateTokenomics("burn", amount)

    console.log(`[BTN] Burned ${amount} BTN from ${from}`)
    return txHash
  }

  async transferTokens(from: string, to: string, amount: number): Promise<string> {
    if (!this.userId) throw new Error("User not authenticated")

    const balance = await this.getBalance(from)
    if (balance < amount) throw new Error("Insufficient balance")

    const operation: BTNOperation = {
      type: "transfer",
      amount,
      from,
      to,
    }

    const txHash = this.generateTxHash()

    const { error } = await this.supabase.from("btn_operations").insert({
      user_id: this.userId,
      operation_type: operation.type,
      amount: operation.amount,
      from_address: operation.from,
      to_address: operation.to,
      tx_hash: txHash,
      status: "confirmed",
    })

    if (error) throw error

    await this.updateBalance(from, amount, "subtract")
    await this.updateBalance(to, amount, "add")

    console.log(`[BTN] Transferred ${amount} BTN from ${from} to ${to}`)
    return txHash
  }

  // Staking Operations
  async stakeTokens(poolId: string, amount: number): Promise<string> {
    if (!this.userId) throw new Error("User not authenticated")

    const balance = await this.getBalance(this.walletAddress!)
    if (balance < amount) throw new Error("Insufficient balance")

    // Get pool details
    const { data: pool } = await this.supabase.from("btn_staking_pools").select("*").eq("id", poolId).single()

    if (!pool) throw new Error("Staking pool not found")
    if (amount < pool.min_stake) throw new Error(`Minimum stake is ${pool.min_stake} BTN`)

    const unlockDate = pool.lock_period
      ? new Date(Date.now() + pool.lock_period * 24 * 60 * 60 * 1000).toISOString()
      : null

    // Create staking position
    const { error: positionError } = await this.supabase.from("btn_staking_positions").insert({
      user_id: this.userId,
      pool_id: poolId,
      staked_amount: amount,
      unlock_date: unlockDate,
    })

    if (positionError) throw positionError

    // Record staking operation
    const txHash = this.generateTxHash()
    await this.supabase.from("btn_operations").insert({
      user_id: this.userId,
      operation_type: "stake",
      amount,
      tx_hash: txHash,
      status: "confirmed",
      metadata: { poolId, unlockDate },
    })

    // Update balances
    await this.updateBalance(this.walletAddress!, amount, "subtract")
    await this.updateStakedBalance(this.walletAddress!, amount, "add")

    // Update pool total
    await this.supabase
      .from("btn_staking_pools")
      .update({ total_staked: pool.total_staked + amount })
      .eq("id", poolId)

    console.log(`[BTN] Staked ${amount} BTN in pool ${poolId}`)
    return txHash
  }

  async unstakeTokens(positionId: string): Promise<string> {
    if (!this.userId) throw new Error("User not authenticated")

    const { data: position } = await this.supabase
      .from("btn_staking_positions")
      .select("*, btn_staking_pools(*)")
      .eq("id", positionId)
      .eq("user_id", this.userId)
      .single()

    if (!position) throw new Error("Staking position not found")
    if (position.status !== "active") throw new Error("Position is not active")

    // Check if lock period has passed
    if (position.unlock_date && new Date(position.unlock_date) > new Date()) {
      throw new Error("Tokens are still locked")
    }

    // Calculate rewards
    const rewards = await this.calculateStakingRewards(position)
    const totalAmount = position.staked_amount + rewards

    // Update position status
    await this.supabase
      .from("btn_staking_positions")
      .update({
        status: "completed",
        rewards_earned: rewards,
      })
      .eq("id", positionId)

    // Record unstaking operation
    const txHash = this.generateTxHash()
    await this.supabase.from("btn_operations").insert({
      user_id: this.userId,
      operation_type: "unstake",
      amount: totalAmount,
      tx_hash: txHash,
      status: "confirmed",
      metadata: { positionId, rewards },
    })

    // Update balances
    await this.updateBalance(this.walletAddress!, totalAmount, "add")
    await this.updateStakedBalance(this.walletAddress!, position.staked_amount, "subtract")

    console.log(`[BTN] Unstaked ${position.staked_amount} BTN + ${rewards} rewards`)
    return txHash
  }

  // Governance Operations
  async createProposal(title: string, description: string, type: string, votingEnd: string): Promise<string> {
    if (!this.userId) throw new Error("User not authenticated")

    // Check if user has enough voting power
    const votingPower = await this.getVotingPower(this.userId)
    if (votingPower < 1000) throw new Error("Insufficient voting power to create proposal")

    const { data, error } = await this.supabase
      .from("btn_governance_proposals")
      .insert({
        proposer_id: this.userId,
        title,
        description,
        proposal_type: type,
        voting_end: votingEnd,
      })
      .select()
      .single()

    if (error) throw error

    console.log(`[BTN] Created governance proposal: ${title}`)
    return data.id
  }

  async vote(proposalId: string, choice: "for" | "against" | "abstain"): Promise<void> {
    if (!this.userId) throw new Error("User not authenticated")

    const votingPower = await this.getVotingPower(this.userId)
    if (votingPower === 0) throw new Error("No voting power")

    const { error } = await this.supabase.from("btn_governance_votes").insert({
      proposal_id: proposalId,
      voter_id: this.userId,
      vote_choice: choice,
      voting_power: votingPower,
    })

    if (error) throw error

    // Update proposal vote counts
    const updateField = choice === "for" ? "votes_for" : choice === "against" ? "votes_against" : "votes_abstain"

    await this.supabase.rpc("increment_vote_count", {
      proposal_id: proposalId,
      vote_field: updateField,
      vote_amount: votingPower,
    })

    console.log(`[BTN] Voted ${choice} on proposal ${proposalId} with ${votingPower} voting power`)
  }

  // Helper Methods
  private async getBalance(address: string): Promise<number> {
    const { data } = await this.supabase
      .from("btn_balances")
      .select("available_balance")
      .eq("wallet_address", address)
      .single()

    return data?.available_balance || 0
  }

  private async updateBalance(address: string, amount: number, operation: "add" | "subtract"): Promise<void> {
    const currentBalance = await this.getBalance(address)
    const newBalance = operation === "add" ? currentBalance + amount : currentBalance - amount

    await this.supabase.from("btn_balances").upsert(
      {
        wallet_address: address,
        available_balance: newBalance,
        last_updated: new Date().toISOString(),
      },
      { onConflict: "wallet_address" },
    )
  }

  private async updateStakedBalance(address: string, amount: number, operation: "add" | "subtract"): Promise<void> {
    const { data } = await this.supabase
      .from("btn_balances")
      .select("staked_balance")
      .eq("wallet_address", address)
      .single()

    const currentStaked = data?.staked_balance || 0
    const newStaked = operation === "add" ? currentStaked + amount : currentStaked - amount

    await this.supabase.from("btn_balances").upsert(
      {
        wallet_address: address,
        staked_balance: newStaked,
        last_updated: new Date().toISOString(),
      },
      { onConflict: "wallet_address" },
    )
  }

  private async updateTokenomics(operation: "mint" | "burn", amount: number): Promise<void> {
    const { data: tokenomics } = await this.supabase.from("btn_tokenomics").select("*").single()

    if (tokenomics) {
      const updates =
        operation === "mint"
          ? {
              total_supply: tokenomics.total_supply + amount,
              circulating_supply: tokenomics.circulating_supply + amount,
            }
          : {
              total_supply: tokenomics.total_supply - amount,
              circulating_supply: tokenomics.circulating_supply - amount,
              burned_supply: tokenomics.burned_supply + amount,
            }

      await this.supabase
        .from("btn_tokenomics")
        .update({ ...updates, last_updated: new Date().toISOString() })
        .eq("id", tokenomics.id)
    }
  }

  private async calculateStakingRewards(position: any): Promise<number> {
    const stakeDuration = Date.now() - new Date(position.stake_date).getTime()
    const daysStaked = stakeDuration / (1000 * 60 * 60 * 24)
    const annualRate = position.btn_staking_pools.apr / 100
    const dailyRate = annualRate / 365

    return position.staked_amount * dailyRate * daysStaked
  }

  private async getVotingPower(userId: string): Promise<number> {
    const { data } = await this.supabase
      .from("btn_balances")
      .select("available_balance, staked_balance")
      .eq("user_id", userId)
      .single()

    if (!data) return 0

    // Voting power = available balance + 2x staked balance
    return data.available_balance + data.staked_balance * 2
  }

  private generateTxHash(): string {
    return "btn_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  // Public API Methods
  async getTokenomics() {
    const { data } = await this.supabase.from("btn_tokenomics").select("*").single()
    return data
  }

  async getStakingPools() {
    const { data } = await this.supabase.from("btn_staking_pools").select("*").eq("is_active", true)
    return data || []
  }

  async getUserStakingPositions(userId: string) {
    const { data } = await this.supabase
      .from("btn_staking_positions")
      .select("*, btn_staking_pools(*)")
      .eq("user_id", userId)
      .eq("status", "active")

    return data || []
  }

  async getGovernanceProposals() {
    const { data } = await this.supabase
      .from("btn_governance_proposals")
      .select("*")
      .order("created_at", { ascending: false })

    return data || []
  }
}

export const btnTokenProcessor = new BTNTokenProcessor()
