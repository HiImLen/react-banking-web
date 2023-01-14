import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../../../utils'

const initialState = {
  sourceAccount: null,
  destinationAccount: null,
  status: true,
  targetTransactionId: null,
  transaction: null,
  receiver: {},
  listReceiver: []
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
      console.log('getDestinationAccount', res)
      if (res.status === 200 && res.data.status === 'success') {
        dispatch(setDestinationAccount(res.data.data))
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
        navigate(`/transaction/${res.data.data.id}/otpVerify`)
      }
    } catch (err) {
      console.log(err)
    }
  }
)

export const verifyOTP = createAsyncThunk(
  'transfer/verifyOTP',
  async ({ otp, navigate }, { dispatch, getState }) => {
    try {
      const { targetTransactionId } = getState().transfer
      const res = await instance.post('/Transactions/VerifyOTP', {
        otp
      })
      if ((res.status === 200 || res.status === 201) && res.data.status === 'success') { dispatch(setStatus(true)); navigate(`/transaction/${targetTransactionId}/script`) } else { dispatch(false); navigate(`/transaction/${targetTransactionId}/script`) }
    } catch (err) {

    }
  }
)

export const getTransaction = createAsyncThunk(
  'transfer/getTransaction',
  async ({ id }, { dispatch, getState }) => {
    try {
      const res = await instance.get(`/Transactions/GetById/${id}`)
      console.log(res)
      if (res.status === 200 && res.data.status === 'success') { dispatch(setTransaction(res.data.data)) }
    } catch (err) {
      console.log(err)
    }
  }
)

export const getReceiver = createAsyncThunk(
  'transfer/getReceiver',
  async ({ accountNumber }, { dispatch, getState }) => {
    try {
      const res = await instance.get(`/Receivers/Number/${accountNumber}`)
      if (res.data.status === 'success') dispatch(setReceiver(res.data.data))
      else dispatch(setReceiver(null))
    } catch (err) {
      console.log(err)
    }
  }
)

export const createReceiver = createAsyncThunk(
  'transfer/createReceiver',
  async (params, { dispatch, getState }) => {
    try {
      const { destinationAccount } = getState().transfer
      const res = await instance.post('/Receivers', {
        reminiscent_name: params.name,
        account_number: destinationAccount.number,
        bank_id: params.bank_id ?? 1
      })
      if (res.status === 201) dispatch(setReceiver(res.data.data))
    } catch (err) {
      console.log(err)
    }
  }
)

export const fetchReceiver = createAsyncThunk(
  'transfer/fetchReceiver',
  async (params, {dispatch, getState}) => {
    try{
      const res = await instance.get('/Receivers')
      if (res.status === 200 && res.data.status === 'success') dispatch(setListReceiver(res.data.data))
    }catch(err){
      console.log(err)
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
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setTargetTransactionId: (state, action) => {
      state.targetTransactionId = action.payload
    },
    setTransaction: (state, action) => {
      state.transaction = action.payload
    },
    setReceiver: (state, action) => {
      state.receiver = action.payload
    },
    setListReceiver: (state, action) => {
      state.listReceiver = action.payload
    }
  }
})

export const { setSourceAccount, setDestinationAccount, setStatus, setTargetTransactionId, setTransaction, setReceiver,setListReceiver } = transferSlice.actions
export default transferSlice.reducer
