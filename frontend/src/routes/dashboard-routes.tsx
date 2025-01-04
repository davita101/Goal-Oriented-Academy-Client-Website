import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../page/(dashboard)/Dashboard'

export default function DashboardRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard />} />
    </Routes>
  )
}
