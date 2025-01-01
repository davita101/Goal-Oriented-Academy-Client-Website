import * as React from "react";
import Login from "./page/Login";
import { Route, Routes, useNavigate, } from "react-router-dom";
import NavigationRouter from "./page/NavigationRouter";
import { Toaster } from "./components/ui/sonner";
import { useAuthStore } from "./store/authStore";
import { ProtectedRoute, RedirectAuthenticatedUser } from "./utils/protected-routes";
export default function App() {
  const navigate = useNavigate()
  const { checkAuth, user, isLogin } = useAuthStore()
  React.useEffect(() => {
    checkAuth()
  }, [checkAuth])

  React.useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user]
  )
  return (
    <div>
      <header className="text-green-300  text-3xl font-bold p-2 absolute">GOA</header>
      <Routes>
        <Route path="/login" element={
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>

        } />
        <Route path="/*" element={
          <ProtectedRoute>
            <NavigationRouter />
          </ProtectedRoute>
        }>
        </Route>
      </Routes>
      <Toaster />
    </div>
  )
}
