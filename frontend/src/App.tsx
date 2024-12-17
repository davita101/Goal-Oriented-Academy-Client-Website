import { useEffect, useState } from "react";
import Login from "./page/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./page/Dashboard"
import Page from "./page/page";
import VerifyEmail from "./page/Test";
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
        <Route path="/" element={<VerifyEmail/>} />
        <Route path="/login" element={<Login currentUsers={currentUsers} setCurrentUsers={setCurrentUsers} />} />
        <Route path="/dashboard/:id" element={<Page />} />
      </Routes>
    </div>
  )
}
