/* eslint-disable*/
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../../../utils'

const initialState = {
  employeeList: [],
  transactionList: []
}

export const getEmployeeList = createAsyncThunk(
  'admin/getEmployeeList',
  async (params, { dispatch, getState }) => {
    try {
      const res = await instance.get('/Users/Employees')
      console.log("employee list: " ,res)
      if (res.data.status === 'success') {
        dispatch(setEmployeeList(res.data.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
)

export const adminSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    setEmployeeList: (state, action) => {
      state.employeeList = action.payload
    }
  }
})

export const { setEmployeeList} = adminSlice.actions
export default adminSlice.reducer