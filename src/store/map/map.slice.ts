import { createSlice } from '@reduxjs/toolkit'

interface IMapState{
    lastAction: 'follow' | 'animateRoute' | null
    triggerId: number
}
const initialState:IMapState = { lastAction: null, triggerId: 0 }

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        triggerFollow : (state) => {
            state.lastAction = 'follow'
            state.triggerId += 1 
        },
        triggerAnimateRoute: (state) => {
            state.lastAction = 'animateRoute'
            state.triggerId += 1 
        }
    }
})

export const { triggerFollow, triggerAnimateRoute } = mapSlice.actions
export default mapSlice.reducer