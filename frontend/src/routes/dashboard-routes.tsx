import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Default } from '../page/(dashboard)/Default'

export default function DashboardRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Default />} />
    </Routes>
  )
}
