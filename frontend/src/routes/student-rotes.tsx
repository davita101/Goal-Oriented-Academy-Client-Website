import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AllStudents } from '../page/(students)/Students'

export default function StudentRotes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AllStudents />} />
            </Routes>
        </>
    )
}
