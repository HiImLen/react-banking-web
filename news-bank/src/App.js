import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
// import { createTheme } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material'
import EmployeeManager from './app/features/admin/page/EmployeeManager.js'
import TransactionsManager from './app/features/admin/page/TransactionsManager.js'
import CreateDebt from './app/features/debit/page/CreateDebt.js'
import DebtReminder from './app/features/debit/page/DebtReminder.js'
import DebtReminderManagement from './app/features/debit/page/DebtReminderManagement.js'
import InternalTransferDebt from './app/features/debit/page/InternalTransfer.js'
import TransactionDebt from './app/features/debit/page/Transaction.js'
import ExternalTransfer from './app/features/transfer/page/ExternalTransfer.js'
import FundTransfer from './app/features/transfer/page/FundTransfer.js'
import InternalTransfer from './app/features/transfer/page/InternalTransfer.js'
import OTPVerify from './app/features/transfer/page/OTPVerify.js'
import Transaction from './app/features/transfer/page/Transaction.js'
import RecentTransaction from './app/features/recent/page/RecentTransaction.js'
import HomepageCP from './components/Homepage/HomepageCP.js'
import Bank from './views/Bank.js'
import Forgot from './views/Forgot.js'
import Login from './app/features/login/page/Login.js'
import SignUp from './app/features/employee/page/SignUp.js'
import Deposit from './app/features/employee/page/Deposit.js'
import CloseAccount from './app/features/employee/page/CloseAccount.js'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4D54E4',
      secondary: '#22343D'
    },
    overrides: {
      MuiButton: {
        raisedPrimary: {
          color: 'white'
        }
      }
    },
    text: {
      primary: '#000000',
      secondary: '#4D54E4'
    }
  }
})

const App = () => {
  useEffect(() => {

  })
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/" element={
          <RequireAuth>
            <Bank />
          </RequireAuth>
        }>
          <Route index element={<HomepageCP />} />
          <Route path="transfer" element={<FundTransfer />} />
          <Route exact path="transfer/inter" element={<InternalTransfer />} />
          <Route exact path="transfer/external" element={<ExternalTransfer />} />
          <Route exact path="debt" element={<DebtReminder />} />
          <Route exact path="debt/createDebtReminder" element={<CreateDebt />} />
          <Route exact path="debt/debtReminderManagement" element={<DebtReminderManagement />} />
          <Route path="debt/:id/pay" element={(<InternalTransferDebt />)} />
          <Route path="debtReminder/:id/script" element={<TransactionDebt />} />
          <Route path='transaction/:id/otpVerify' element={<OTPVerify />} />
          <Route path='transaction/:id/script' element={<Transaction />} />
          <Route path="recentTransaction" element={<RecentTransaction />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="close" element={<CloseAccount />} />
          <Route exact path="admin/employees" element={<EmployeeManager />} />
          <Route exact path="admin/transactions" element={<TransactionsManager />} />
        </Route>
      </Routes>
    </ThemeProvider>
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
