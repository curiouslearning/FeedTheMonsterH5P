import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DragAndDropStonesState {
    value: boolean
}

const initialState : DragAndDropStonesState = {
    value: false,
}

export const dragndDropStonesSlice = createSlice({
  name: 'dragDropStones',
  initialState,
  reducers: {
    stoneDraggingCurrently: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

export const { stoneDraggingCurrently } = dragndDropStonesSlice.actions

export default dragndDropStonesSlice.reducer