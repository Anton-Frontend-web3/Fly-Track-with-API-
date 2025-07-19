import { configureStore } from '@reduxjs/toolkit'
import favoritesSlice from './favorites/favorites.slice'

export const store = configureStore({
	reducer: {favorites:favoritesSlice}
})

export type TRootState = ReturnType<typeof store.getState>

export type TAppDispatch = typeof store.dispatch
