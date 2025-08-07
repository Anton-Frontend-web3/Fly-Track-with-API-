import { configureStore } from '@reduxjs/toolkit'
import favoritesSlice from './favorites/favorites.slice'
import  mapSlice  from './map/map.slice'

export const store = configureStore({
	reducer: {favorites:favoritesSlice,map:mapSlice}
})

export type TRootState = ReturnType<typeof store.getState>

export type TAppDispatch = typeof store.dispatch
