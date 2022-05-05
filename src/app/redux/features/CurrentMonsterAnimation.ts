import { createSlice, PayloadAction } from '@reduxjs/toolkit'

enum MONSTER_ANIMATION {
    IDLE = 'idle',
    EAT = 'eat',
    SPIT = 'spit'
}

interface CurrentAnimationType {
    value: string
}

const initialState : CurrentAnimationType = {
    value: 'idle',
}

export const currentMonsterAnimationSlice = createSlice({
  name: 'currentMonsterAnimation',
  initialState,
  reducers: {
    changeMonsterAnimation: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { changeMonsterAnimation } = currentMonsterAnimationSlice.actions

export default currentMonsterAnimationSlice.reducer