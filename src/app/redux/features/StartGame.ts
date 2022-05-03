import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface StartGame {
    value: boolean
}

const initialState : StartGame = {
    value: false,
}

export const startGameSlice = createSlice({
  name: 'startGame',
  initialState,
  reducers: {
    clickOnStartGame: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

export const { clickOnStartGame } = startGameSlice.actions

export default startGameSlice.reducer