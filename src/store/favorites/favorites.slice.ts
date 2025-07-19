const LS_KEY = 'favorites'

import { createSlice } from '@reduxjs/toolkit'

const getFavoritesFromLocalStorage = () => {
	const favorites = localStorage.getItem(LS_KEY)
	if (!favorites) return []
	return JSON.parse(favorites)
}

const saveFavoriteToLocalStorage = (favorites: string[]) => {
	localStorage.setItem(LS_KEY, JSON.stringify(favorites))
}

const initialState: string[] = getFavoritesFromLocalStorage()

export const favoritesSlice = createSlice({
	name: LS_KEY,
	initialState,
	reducers: {
		addFavorite: (state, action) => {
			if (!state.includes(action.payload)) {
				state.push(action.payload)
				saveFavoriteToLocalStorage(state)
			}
		},
		removeFavorite: (state, action) => {
			const newState = state.filter(id => id !== action.payload)
			saveFavoriteToLocalStorage(newState)
			return newState
		}
	}
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
