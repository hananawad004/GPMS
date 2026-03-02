import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequestRegister from "../features/auth/pages/RequestRegister";
import Login from "../features/auth/pages/Login";

export default function AppRoutes({ toggleTheme }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<RequestRegister toggleTheme={toggleTheme} />}
        />
        <Route
          path="/login"
          element={<Login toggleTheme={toggleTheme} />}
        />
      </Routes>
    </BrowserRouter>
  );
}