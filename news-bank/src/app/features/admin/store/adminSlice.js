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

export const createEmployee = createAsyncThunk(
  'admin/createEmployee',
  async (employeeData, { dispatch, getState }) => {
    try {
      employeeData.role_id = 3
      const res = await instance.post('/Users', employeeData)
      console.log("employee create: " , res)
      if (res.data.status === 'success') {
        dispatch(getEmployeeList())
      }
    } catch (err) {
      console.log(err)
    }
  }
)

export const deleteEmployee = createAsyncThunk(
  'admin/deleteEmployee',
  async (id, { dispatch, getState }) => {
    try {
      console.log("delete employee: " ,id)
      const res = await instance.delete(`/Users/Employees/${id}`)
      if (res.data.status === 'success') {
        dispatch(getEmployeeList())
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
    },
    removeEmployee: (state, action) => {
      state.employeeList = state.employeeList.filter((employee) => employee.id !== action.payload)
    }
  }
})

export const { setEmployeeList, removeEmployee} = adminSlice.actions
export default adminSlice.reducer