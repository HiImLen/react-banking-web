import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  user_id: 0,
  username: '',
  email: '',
  phone: '',
  name: '',
  role_id: 0
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginInfo: (state, action) => {
      state.user_id = action.payload.user_id
      state.username = action.payload.username
      state.email = action.payload.email
      state.phone = action.payload.phone
      state.name = action.payload.name
      state.role_id = action.payload.role_id
    }
  }
})

export const { setLoginInfo } = loginSlice.actions
export default loginSlice.reducer
