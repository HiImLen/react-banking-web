import { configureStore } from '@reduxjs/toolkit'
import debtReducer from './features/debit/store/debtSlice.js'
import debtTranscriptReducer from './features/debit/store/debtTranscriptSlice.js'
import transferReducer from './features/transfer/store/transferSlice.js'

export default configureStore({
  reducer: {
    transfer: transferReducer,
    debt: debtReducer,
    debtTranscript: debtTranscriptReducer
  }
})
