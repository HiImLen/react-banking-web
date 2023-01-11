/* eslint-disable react/prop-types */
import React  from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
//import { createTheme } from '@mui/material';
import Login from './views/Login.js';
import SignUp from './views/SignUp.js';
import Forgot from './views/Forgot.js';
import OTPVerify from './components/FundTransfer/OTPVerify.js';
import InternalTransfer from './components/FundTransfer/InternalTransfer.js';
import { parseJwt } from './utils.js';
import { useEffect } from 'react';
import HomepageCP from './components/Homepage/HomepageCP.js';
import Bank from './views/Bank.js';

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

  });
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
            <Route exact path='otpVerify' element={<OTPVerify />} />
          </Route>
        </Routes>
  )
}

const RequireAuth = ({ children }) => {

  const location = useLocation();


  const decode = parseJwt(localStorage.token);
  console.log(decode);

  if (!localStorage.token) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }

  return children;
}

export default App;
