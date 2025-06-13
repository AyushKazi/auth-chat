import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wrapper from "./pages/Wrapper";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
