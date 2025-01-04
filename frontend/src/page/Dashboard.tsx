import React from 'react'
import { DataTable } from '../components/data-table'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div>
      <DataTable />
    </div>
  )
}
