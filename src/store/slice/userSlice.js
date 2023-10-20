import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: true,
  users: [],
  }
 

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchingUsers(state){
        state.loading = true;
    },
    fetchSuccessUsers(state, action){
        state.loading = false;
        state.users = action.payload   
        
        state.error = '' 
    },
    fetchErrorUsers(state, action){
        state.loading = false;
        state.error = action.payload.message
    }
  }
})

export const { fetchingUsers, fetchSuccessUsers, fetchErrorUsers } = usersSlice.actions

export default usersSlice.reducer