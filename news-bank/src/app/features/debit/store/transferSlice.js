import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../../../utils'

const initialState = {
  sourceAccount: {},
  destinationAccount: {},
  otp: '',
  status: true
}

export const getSourceAccount = createAsyncThunk(
  'transfer/getSourceAccount',
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
  'transfer/getDestinationAccount',
  async ({ accountNumber }, { dispatch, getState }) => {
    try {
      const res = await instance.get(`/Accounts/${accountNumber}/Internal`)
      if (res.status === 200 && res.data.status === 'success') {
        setDestinationAccount(res.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  })

export const createTransaction = createAsyncThunk(
  'transfer/createTransaction',
  async ({ data, navigate }, { dispatch, getState }) => {
    try {
      const { sourceAccount } = getState().transfer
      const transactionData = {
        ...data,
        source_account_number: sourceAccount.number,
        destination_bank_id: 1
      }
      console.log(transactionData)
      const res = await instance.post('/Transactions', transactionData)
      console.log(res)
      if (res.data.status === 'success') {
        navigate('/otpVerify')
      }
    } catch (err) {
      console.log(err)
    }
  }
)

export const verifyOTP = createAsyncThunk(
  'transfer/verifyOTP',
  async ({ navigate }, { dispatch, getState }) => {
    try {
      const { otp } = getState().transfer
      const res = await instance.post('/Transactions/VerifyOTP', {
        otp
      })
      if ((res.status === 200 || res.status === 201) && res.data.status === 'success') { navigate('/transaction/success') } else navigate('/transaction/fail')
    } catch (err) {

    }
  }
)

export const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    setSourceAccount: (state, action) => {
      state.sourceAccount = action.payload
    },
    setDestinationAccount: (state, action) => {
      state.destinationAccount = action.payload
    },
    setOTP: (state, action) => {
      state.otp = action.payload
    },
    setStatus: (state, action) => {
      state.status = action.payload
    }
  }
})

export const { setSourceAccount, setDestinationAccount, setOTP } = transferSlice.actions
export default transferSlice.reducer
