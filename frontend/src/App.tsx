import * as React from "react";
import { useState } from "react";
import Login from "./page/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import User from "./page/page";
import { Toaster } from "./components/ui/sonner";
export default function App() {
  const [currentUsers, setCurrentUsers] = useState('')
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (currentUsers && currentUsers.length > 0 && currentUsers[0]["login"]) {
  //     setTimeout(() => {
  //       navigate(`/goa/${currentUsers[0]["_id"]}/dashboard`);
  //     }, 1000)
  //   } else {
  //     setTimeout(() => {
  //       navigate('/login')
  //     }, 1000)
  //   }
  // }, [currentUsers, navigate]);

  return (
    <div>
      <header className="text-green-300 text-3xl font-bold p-2 absolute">GOA</header>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/login" element={<Login currentUsers={currentUsers} setCurrentUsers={setCurrentUsers} />} />
        <Route path="/*" element={<User />} />
      </Routes>
      <Toaster />
    </div>
  )
}
