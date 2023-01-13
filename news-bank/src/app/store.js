import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import debtReducer from './features/debit/store/debtSlice.js'
import debtTranscriptReducer from './features/debit/store/debtTranscriptSlice.js'
import transferReducer from './features/transfer/store/transferSlice.js'
import loginReducer from '../slice/loginSlice.js'

export const rootReducer = combineReducers({
  transfer: transferReducer,
  debt: debtReducer,
  debtTranscript: debtTranscriptReducer,
  login: loginReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export const persistor = persistStore(store);
export default store;