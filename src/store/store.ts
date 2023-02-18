import { configureStore } from '@reduxjs/toolkit'
import toDoReducer from './slices/toDoSlice'

export const store = configureStore({
  reducer: {
    toDoReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch