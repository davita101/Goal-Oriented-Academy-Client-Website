import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Test() {
  const [users, setUsers] = useState([])
  useEffect(() => {
      axios.get("http://localhost:5000/api")
      .then(users => setUsers(users.data))
      .catch(error => console.log(error))
  },[])

  console.log(users)
  return (
    <div>
      Test
    </div>
  )
}
