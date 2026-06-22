import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  sidebarCollapsed: boolean
  mobileSidebarOpen: boolean
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarCollapsed: false,
    mobileSidebarOpen: false,
  } as UiState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setMobileSidebarOpen(state, action: PayloadAction<boolean>) {
      state.mobileSidebarOpen = action.payload
    },
  },
})

export const { toggleSidebar, setMobileSidebarOpen } = uiSlice.actions
export default uiSlice.reducer
