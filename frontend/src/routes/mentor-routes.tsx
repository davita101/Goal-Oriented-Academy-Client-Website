import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Mentor } from '../page/(mentor)/Mentor'

export default function MentorRoutes() {
  return (
    <>
      <Routes>
        <Route path="/group" element={<Mentor />} />
      </Routes>
    </>
  )
}
