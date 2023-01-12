import { configureStore } from '@reduxjs/toolkit'
import transferReducer from './features/transfer/store/transferSlice.js'

export default configureStore({
  reducer: {
    transfer: transferReducer
  }
})
