import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../../../utils'

const initialState = {
  listTransaction: []
}

export const fetchTransaction = createAsyncThunk(
    'recent/fetchTransaction',
    async (params, { dispatch, getState }) => {
      try {
        const res = await instance.get(`/Transactions`,{params:{time: params.time}})
        console.log("res", res)
        if (res.status === 200) dispatch(setListTransaction(res.data.data))
      } catch (err) {
        console.log(err)
      }
    }
  )

export const recentSlice = createSlice({
  name: 'recent',
  initialState,
  reducers: {
    setListTransaction: (state, action) => {
        state.listTransaction = action.payload
    }
  }
})

export const { setListTransaction } = recentSlice.actions
export default recentSlice.reducer
