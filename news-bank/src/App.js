import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <RequireAuth>
            <Todo />
          </RequireAuth>
        } /> */}
      </Routes>
    </BrowserRouter>
  )
}

const RequireAuth = ({ children }) => {

  const location = useLocation();

  if (!localStorage.todoApp_accessToken) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }

  return children;
}

export default App;
