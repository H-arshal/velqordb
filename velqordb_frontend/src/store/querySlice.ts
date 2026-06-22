import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { QueryError, QueryResult } from '@/types'
import { DEFAULT_SQL } from '@/utils/mock-data'

interface QueryTab {
  id: string
  title: string
  sql: string
  dirty: boolean
}

interface QueryState {
  tabs: QueryTab[]
  activeTabId: string
  result: QueryResult | null
  error: QueryError | null
  isRunning: boolean
  resultView: 'table' | 'json'
}

const defaultTab: QueryTab = { id: '1', title: 'Query 1', sql: DEFAULT_SQL, dirty: false }

const querySlice = createSlice({
  name: 'query',
  initialState: {
    tabs: [defaultTab],
    activeTabId: '1',
    result: null,
    error: null,
    isRunning: false,
    resultView: 'table',
  } as QueryState,
  reducers: {
    setSql(state, action: PayloadAction<string>) {
      const tab = state.tabs.find((t) => t.id === state.activeTabId)
      if (tab) {
        tab.sql = action.payload
        tab.dirty = true
      }
    },
    setResult(state, action: PayloadAction<QueryResult | null>) {
      state.result = action.payload
      state.error = null
    },
    setError(state, action: PayloadAction<QueryError | null>) {
      state.error = action.payload
      state.result = null
    },
    setRunning(state, action: PayloadAction<boolean>) {
      state.isRunning = action.payload
    },
    setResultView(state, action: PayloadAction<'table' | 'json'>) {
      state.resultView = action.payload
    },
    addTab(state) {
      const id = String(Date.now())
      state.tabs.push({ id, title: `Query ${state.tabs.length + 1}`, sql: '', dirty: false })
      state.activeTabId = id
    },
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTabId = action.payload
    },
    closeTab(state, action: PayloadAction<string>) {
      if (state.tabs.length <= 1) return
      state.tabs = state.tabs.filter((t) => t.id !== action.payload)
      if (state.activeTabId === action.payload) {
        state.activeTabId = state.tabs[0].id
      }
    },
  },
})

export const { setSql, setResult, setError, setRunning, setResultView, addTab, setActiveTab, closeTab } = querySlice.actions
export default querySlice.reducer
