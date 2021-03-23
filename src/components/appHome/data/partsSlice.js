import { createSlice } from '@reduxjs/toolkit'

import parts from '../../fakeAPI/Parts'

const partsSlice = createSlice({
  name: 'parts',
  initialState: parts(),
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
export default partsSlice.reducer

export const selectPartsAll = (state) => state.parts

export const selectPartsById = (state, id) =>{
    return state.parts.find(part => part.id === id)
}