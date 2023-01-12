/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
// import { createTheme } from '@mui/material';
import InternalTransfer from './app/features/transfer/page/InternalTransfer.js'
import OTPVerify from './app/features/transfer/page/OTPVerify.js'
import Transaction from './app/features/transfer/page/Transaction.js'
import HomepageCP from './components/Homepage/HomepageCP.js'
import Bank from './views/Bank.js'
import Forgot from './views/Forgot.js'
import Login from './views/Login.js'
import SignUp from './views/SignUp.js'

// const theme = createTheme({
//   palette:{
//     primary:{
//       main: '#4D54E4',
//       secondary:'#22343D',
//     },
//     overrides: {
//       MuiButton: {
//         raisedPrimary: {
//           color: 'white',
//         },
//       },
//     },
//     text:{
//       primary:'#000000',
//       secondary: '#4D54E4',
//     },
//   },
// })

const App = () => {
  useEffect(() => {

  })
  return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/" element={
            <RequireAuth>
              <Bank />
            </RequireAuth>
          }>
            <Route index element={<HomepageCP/>} />
            <Route exact path="transfer" element={<InternalTransfer />} />
            <Route path='transaction/:id/otpVerify' element={<OTPVerify />} />
            <Route path="transaction/:id/:status" element={<Transaction/>}/>
          </Route>
        </Routes>
  )
}

const RequireAuth = ({ children }) => {
  const location = useLocation()

  if (!localStorage.token) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }

  return children
}

export default App
