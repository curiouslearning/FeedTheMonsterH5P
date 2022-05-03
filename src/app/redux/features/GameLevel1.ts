import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LevelProps {
    pauseButtonClicked: boolean,
    timerStartAndStop: boolean,
    timeEnded: boolean,
    timerProgress: number,
    stoneDropped: boolean,
    isLevelEnded: boolean,
    currentPuzzelNumber: number,
    currentScore : number,
    stopTimer : boolean,
    feedBackText: string
}

interface GameLevel1 {
    level : LevelProps
}


const initialState : GameLevel1 = {

    level: {
        pauseButtonClicked: false,
        timerStartAndStop: false,
        timeEnded: false,
        timerProgress: 10.5,
        stoneDropped: false,
        isLevelEnded: false,
        currentPuzzelNumber: 0 ,
        currentScore : 0,
        stopTimer: false,
        feedBackText: ""
    }
}

export const gameLevel1Slice = createSlice({
  name: 'gameLevel',
  initialState,
  reducers: {

    // incrementPuzzelIndicator: (state, action: PayloadAction<number>) => {
    //     state.currentPuzzelIndicator = action.payload
    // },

    onClickPauseButton: (state, action: PayloadAction<boolean>) => {
        state.level = {
            pauseButtonClicked: state.level.pauseButtonClicked ? false : true,
            timerStartAndStop: true,
            timeEnded: state.level.timerProgress <= 0.9 ? true : false,
            timerProgress: state.level.timerProgress,
            stoneDropped: state.level.stoneDropped,
            isLevelEnded: state.level.isLevelEnded,
            currentPuzzelNumber: state.level.currentPuzzelNumber,
            currentScore: state.level.currentScore,
            stopTimer: state.level.stopTimer,
            feedBackText: state.level.feedBackText
        }
    },

    stoneDroppedAtMonster : (state, action: PayloadAction<boolean>) => {
        state.level = {
            pauseButtonClicked: state.level.pauseButtonClicked,
            timerStartAndStop: true,
            timeEnded: state.level.timeEnded,
            stoneDropped: true,
            timerProgress: 10,
            isLevelEnded: state.level.isLevelEnded,
            currentPuzzelNumber: state.level.currentPuzzelNumber + 1,
            currentScore: state.level.currentScore,
            stopTimer: state.level.stopTimer,
            feedBackText: state.level.feedBackText
        }
    },

    startTheTimer : (state, action: PayloadAction<LevelProps>) => {
        state.level = {
            pauseButtonClicked: state.level.pauseButtonClicked,
            timerStartAndStop: state.level.timerStartAndStop,
            timeEnded: state.level.timeEnded,
            timerProgress: state.level.timerProgress - 0.5,
            stoneDropped: state.level.stoneDropped,
            isLevelEnded: state.level.isLevelEnded,
            currentPuzzelNumber: state.level.currentPuzzelNumber,
            currentScore: state.level.currentScore,
            stopTimer: state.level.stopTimer,
            feedBackText: state.level.feedBackText
        }
    },

    onClickRestart : (state, action: PayloadAction<LevelProps>) => {
        state.level = {
            pauseButtonClicked: false,
            timerStartAndStop: false,
            timeEnded: false,
            timerProgress: 10.5,
            stoneDropped: false,
            isLevelEnded: false,
            currentPuzzelNumber: 0,
            currentScore : 0,
            stopTimer: false,
            feedBackText: state.level.feedBackText
        }
    },

    stopTheTimer : (state, action: PayloadAction<LevelProps>) => {
        state.level = {
            pauseButtonClicked: state.level.pauseButtonClicked,
            timerStartAndStop: state.level.timerStartAndStop,
            timeEnded: state.level.timeEnded,
            timerProgress: state.level.timerProgress,
            stoneDropped: state.level.stoneDropped,
            isLevelEnded: state.level.isLevelEnded,
            currentPuzzelNumber: state.level.currentPuzzelNumber,
            currentScore: state.level.currentScore,
            stopTimer: true,
            feedBackText: state.level.feedBackText
        }
    },
  },
})

export const { onClickPauseButton, stoneDroppedAtMonster, startTheTimer, onClickRestart,  stopTheTimer } = gameLevel1Slice.actions

export default gameLevel1Slice.reducer