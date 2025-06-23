import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wrapper from "./ProtectedRoute";
import AuthRedirect from "./AuthRedirect";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route element={<AuthRedirect />}>
            <Route path="/signUp" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected */}
          <Route element={<Wrapper />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
