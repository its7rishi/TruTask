import { Routes, Route } from "react-router-dom";
import Login from "./_auth/pages/Login";
import Signup from "./_auth/pages/Signup";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Home } from "./_root/pages";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <div className="w-screen pb-4 overflow-hidden">
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
          </Route>
          {/* Private Routes */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}
export default App;

/* 
** PUBLIC**
Login Page
Sign-up Page

** PRIVATE **
Home Page
  Filter
   - All
   - This week
   - This month
   - Important
Create Task
Task Details
*/
