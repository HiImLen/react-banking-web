import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../../../utils'

const initialState = {
  sourceAccount: null,
  debtReminder: null
}

export const getSourceAccount = createAsyncThunk(
  'debt/getSourceAccount',
  async (params, { dispatch, getState }) => {
    try {
      const res = await instance.get('/Users/Accounts')
      console.log(res)
      if (res.data.status === 'success') {
        dispatch(setSourceAccount(res.data.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
)

export const getDebtReminder = createAsyncThunk(
  'debt/getDebtReminder',
  async (params, { dispatch, getState }) => {
    try {
      const res = await instance.get(`/DebtReminders/${params.id}`)
      if (res.status === 200) dispatch(setDebtReminder(res.data.data))
    } catch (err) {
      console.log(err)
    }
  }
)

export const debtTranscriptSlice = createSlice({
  name: 'debt',
  initialState,
  reducers: {
    setSourceAccount: (state, action) => {
      state.sourceAccount = action.payload
    },
    setDebtReminder: (state, action) => {
      state.debtReminder = action.payload
    }
  }
})

export const { setSourceAccount, setDebtReminder } = debtTranscriptSlice.actions
export default debtTranscriptSlice.reducer
