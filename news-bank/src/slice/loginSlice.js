import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../utils'

const initialState = {
  token: '',
  refreshtoken: '',
  username: '',
  email: '',
  phone: '',
  name: '',
  role_id: ''
}

export const clearLoginInfo = () => {
  return (dispatch) => {
    dispatch(setLoginInfo(initialState))
  }
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginInfo: (state, action) => {
      state.token = action.payload.token
      state.refreshtoken = action.payload.refreshtoken
      state.username = action.payload.username
      state.email = action.payload.email
      state.phone = action.payload.phone
      state.name = action.payload.name
      state.role_id = action.payload.role_id
    }
  }
})

//export const { } = loginSlice.actions
export default loginSlice.reducer
