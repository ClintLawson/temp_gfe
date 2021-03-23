import { createSlice } from '@reduxjs/toolkit'

import users from '../../fakeAPI/ServiceTechs'

const usersSlice = createSlice({
  name: 'users',
  initialState: users(),
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
export default usersSlice.reducer

export const selectUsersAll = (state) => state.users

export const selectUserById = (state, userId) =>{
    console.log(userId)
    return state.users.find(user => user.id === userId)
}