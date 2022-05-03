import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GameLevel {
    timerStartAndStop : boolean,
    timeEnded : boolean,
    timerProgress : number,
    stoneDropped : boolean,
    pauseButtonClicked : boolean,
    levelEnded : boolean,
    currentPuzzelIndicator : number,
    score : number
}

const initialState : GameLevel = {
    pauseButtonClicked: false,
    timerStartAndStop: false,
    timeEnded: false,
    timerProgress: 10.5,
    stoneDropped: false,
    levelEnded: false,
    currentPuzzelIndicator: 0,
    score : 0
}

export const gameLevelSlice = createSlice({
  name: 'gameLevel',
  initialState,
  reducers: {

    incrementPuzzelIndicator: (state, action: PayloadAction<number>) => {
        state.currentPuzzelIndicator = action.payload
    },

    onClickPauseButton: (state, action: PayloadAction<boolean>) => {
        state.timerStartAndStop = false,
        state.pauseButtonClicked = true
    },

    stoneDroppedAtMonster : (state, action: PayloadAction<boolean>) => {
        state.stoneDropped = true
    },

    timerProgress : (state, action: PayloadAction<boolean>) => {
        state.timerProgress = state.timerProgress - 0.5
    },

    setGameLevelTimer : (state, action: PayloadAction<number>) => {
        console.log("eyeyeyeeyeyey")
        state.timerProgress = initialState.timerProgress
    },
  },
})

export const { incrementPuzzelIndicator, onClickPauseButton, stoneDroppedAtMonster, timerProgress, setGameLevelTimer } = gameLevelSlice.actions

export default gameLevelSlice.reducer