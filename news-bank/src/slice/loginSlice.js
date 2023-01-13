import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
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
