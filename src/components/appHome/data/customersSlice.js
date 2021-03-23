import { createSlice } from '@reduxjs/toolkit'

import customers from '../../fakeAPI/Customers'

const customersSlice = createSlice({
  name: 'customers',
  initialState: customers(),
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
export default customersSlice.reducer

export const selectCustomersAll = (state) => state.customers

export const selectCustomersById = (state, id) =>{
    return state.customers.find(customer => customer.id === id)
}