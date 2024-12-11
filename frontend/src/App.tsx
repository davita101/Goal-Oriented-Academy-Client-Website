import { useEffect, useState } from "react";
import Login from "./page/Login";
import axios from "axios";
import { Link } from "react-router-dom";
export default function App() {

  return (
    <div>
      <header className="text-green-300 text-3xl font-bold p-2 absolute">GOA</header>
      <Login/>
    </div>  
  )
}
