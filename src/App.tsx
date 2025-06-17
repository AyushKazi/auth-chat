import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wrapper from "./pages/Wrapper";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            {/* home */}
            <Route path="/" element={<Home />} />

            {/* register */}
            <Route path="/signUp" element={<Signup />} />

            {/* login */}
            <Route path="/login" element={<Login />} />

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={
                <Wrapper>
                  <Dashboard />
                </Wrapper>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
