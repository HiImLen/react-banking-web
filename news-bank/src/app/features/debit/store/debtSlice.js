import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../../../utils'

const initialState = {
  sourceAccount: null,
  destinationAccount: null,
  listDebt: [],
  targetDebt: null,
  targetTransactionId: null
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

export const getDestinationAccount = createAsyncThunk(
  'debt/getDestinationAccount',
  async ({ accountNumber }, { dispatch, getState }) => {
    try {
      const res = await instance.get(`/Accounts/${accountNumber}/Internal`)
      if (res.status === 200 && res.data.status === 'success') {
        dispatch(setDestinationAccount(res.data.data))
      }
    } catch (err) {
      console.log(err)
    }
  }
)

export const createDebtReminder = createAsyncThunk(
  'debt/createDebtReminder',
  async ({ data, navigate }, { dispatch, getState }) => {
    try {
      const { sourceAccount, destinationAccount } = getState().debt
      console.log(data)
      console.log('sourceAccount', sourceAccount)
      console.log('destinationAccount', destinationAccount)
      const res = await instance.post('/DebtReminders', {
        source_account_number: sourceAccount.number,
        source_owner_name: data.source_owner_name,
        destination_account_number: data.destination_account_number,
        destination_owner_name: destinationAccount.name,
        amount: data.amount,
        note: data.note
      })
      console.log(res)
      if (res.status === 201) navigate(`/debtReminder/${res.data.data.id}/script`)
    } catch (err) {
      console.log(err)
    }
  }
)

export const fetchDebt = createAsyncThunk(
  'debt/fetchDebt',
  async (params, { dispatch, getState }) => {
    try {
      const res = await instance.get('/DebtReminders')
      if (res.status === 200) dispatch(setListDebt(res.data.data))
    } catch (err) {
      console.log(err)
    }
  }
)

export const payDebt = createAsyncThunk(
  'debt/pay',
  async (params, { dispatch, getState }) => {
    try {
      const { targetDebt, sourceAccount } = getState().debt
      const res = await instance.post(`/DebtReminders/${targetDebt.id}/Pay`, {
        source_account_number: sourceAccount.number,
        destination_account_number: targetDebt.number,
        note: params.note,
        fee_is_paid_by_receiver: params.fee_is_paid_by_receiver
      })
      console.log(res)
      if (res.status === 201) dispatch(setTargetTransactionId(res.data.data.id))
    } catch (err) {
      console.log(err)
    }
  }
)

export const verifyOTP = createAsyncThunk(
  'debt/verifyOTP',
  async ({ otp, navigate }, { dispatch, getState }) => {
    try {
      const res = await instance.post('/Transactions/VerifyOTP', {
        otp
      })
      console.log(res)
      if ((res.status === 200 || res.status === 201) && res.data.status === 'success') { navigate(`/debtReminder/${res.data.data.id}/script`) }
    } catch (err) {
      console.log(err)
    }
  }
)

export const deleteDebt = createAsyncThunk(
  'debt/deleteDebt',
  async (params, { dispatch, getState }) => {
    try {
      const { targetDebt } = getState().debt
      console.log(targetDebt)
      const res = await instance.delete(`/DebtReminders/${targetDebt.id}`, {
        note: ''
      })
      if (res.status === 201) { dispatch(fetchDebt()) }
    } catch (err) {
      console.log(err)
    }
  }
)

export const debtSlice = createSlice({
  name: 'debt',
  initialState,
  reducers: {
    setSourceAccount: (state, action) => {
      state.sourceAccount = action.payload
    },
    setDestinationAccount: (state, action) => {
      state.destinationAccount = action.payload
    },
    setListDebt: (state, action) => {
      state.listDebt = action.payload
    },
    setTargetDebt: (state, action) => {
      state.targetDebt = action.payload
    },
    setTargetTransactionId: (state, action) => {
      state.targetTransactionId = action.payload
    }
  }
})

export const { setSourceAccount, setDestinationAccount, setListDebt, setTargetDebt, setTargetTransactionId } = debtSlice.actions
export default debtSlice.reducer
