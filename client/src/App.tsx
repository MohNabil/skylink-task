import Layout from "./components/Layout";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoutes";

function App() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
