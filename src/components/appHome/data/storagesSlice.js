import { createSlice } from '@reduxjs/toolkit'

import storages from '../../fakeAPI/Storages'

const storagesSlice = createSlice({
  name: 'storages',
  initialState: storages(),
  reducers: {
    // increment(state) {
    //   state.value++
    // },
    // decrement(state) {
    //   state.value--
    // },
    // incrementByAmount(state, action) {
    //   state.value += action.payload
    // },
  },
}) 
export default storagesSlice.reducer

export const selectStoragesAll = (state) => state.storages

export const selectStoragesById = (state, id) =>{
    return state.storages.find(storage => storage.id === id)
}