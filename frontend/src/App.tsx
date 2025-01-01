import * as React from "react";
import Login from "./page/Login";
import { Route, Routes,  } from "react-router-dom";
import NavigationRouter from "./page/NavigationRouter";
import { Toaster } from "./components/ui/sonner";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NavigationRouter />} />
      </Routes>
      <Toaster />
    </div>
  )
}
