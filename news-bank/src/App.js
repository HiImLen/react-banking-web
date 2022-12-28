import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Bank from './views/Bank.js';
import Login from './views/Login.js';
import SignUp from './views/SignUp.js';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={
          <RequireAuth>
            <Bank />
          </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  )
}

const RequireAuth = ({ children }) => {

  const location = useLocation();

  if (!localStorage.token) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }

  return children;
}

export default App;
