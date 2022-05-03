import { configureStore } from "@reduxjs/toolkit";
import startGameReducer from "./redux/features/StartGame";
import dragDropStonesReducer from './redux/features/DragAndDropStones';
import MonsterAnimationReducer from './redux/features/CurrentMonsterAnimation';
import gameLevelReducer from './redux/features/GameLevel1';

export const store = configureStore({
    reducer: {
        startGame : startGameReducer,
        dragDropStones : dragDropStonesReducer,
        currentMonsterAnimation : MonsterAnimationReducer,
        gameLevel : gameLevelReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


