import type React from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { ErrorBoundary } from "@/components/error-boundary"
import { jest } from "@jest/globals"

// Mock Supabase client for testing
export const mockSupabaseClient = {
  auth: {
    getUser: jest.fn(),
    signInWithPassword: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChange: jest.fn(() => ({ data: { subscription: { unsubscribe: jest.fn() } } })),
  },
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn(),
      })),
      order: jest.fn(() => ({
        limit: jest.fn(),
      })),
    })),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  })),
  channel: jest.fn(() => ({
    on: jest.fn(() => ({
      subscribe: jest.fn(),
    })),
    unsubscribe: jest.fn(),
  })),
}

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>
}

// Custom render function
const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: TestWrapper, ...options })

// Test data generators
export const generateMockUser = (overrides = {}) => ({
  id: "test-user-id",
  email: "test@example.com",
  username: "testuser",
  reputation_score: 1250,
  level: 5,
  total_earnings: 2500.75,
  mining_power: 850,
  created_at: new Date().toISOString(),
  ...overrides,
})

export const generateMockTransaction = (overrides = {}) => ({
  id: "test-tx-id",
  user_id: "test-user-id",
  type: "mining_reward",
  amount: 10.5,
  currency: "BTN",
  status: "completed",
  created_at: new Date().toISOString(),
  ...overrides,
})

// Performance testing utilities
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`[v0] Performance: ${name} took ${end - start} milliseconds`)
}

// Mock blockchain operations
export const mockBlockchainOperations = {
  startMining: jest.fn(() => Promise.resolve({ success: true, hashRate: 1000 })),
  stopMining: jest.fn(() => Promise.resolve({ success: true })),
  sendTransaction: jest.fn(() => Promise.resolve({ txHash: "mock-hash", success: true })),
  getBalance: jest.fn(() => Promise.resolve(1000.5)),
  stakeTokens: jest.fn(() => Promise.resolve({ success: true, stakingId: "mock-stake-id" })),
}

export * from "@testing-library/react"
export { customRender as render }
