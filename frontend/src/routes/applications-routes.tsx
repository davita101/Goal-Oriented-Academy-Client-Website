import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Button } from './../components/ui/button'
import { t } from 'i18next'
import { Card } from '../components/ui/card'
import ProfileRoutes from '../page/(profile)/ProfileRoutes'

export default function ApplicationRoutes() {
    return (
        <div>
            <div className='absolute flex justify-center items-center h-screen w-full top-0 '>
                <div className='absolute'>
                    <div className=" font-bold my-4  text-xl capitalize flex items-center">
                        {t("applications")}
                    </div>
                    <Card className=''>

                        <Link to={`/applications/profile-edit/profile`} className=' hover:bg-stone-100 rounded-md w-52'>
                            <Button className='w-full flex items-center justify-start' variant={'link'}>{"profile"}</Button>
                        </Link>
                    </Card>
                </div>
            </div>
            <Routes>
                <Route path="/profile-edit/*" element={<ProfileRoutes />} />
            </Routes>
        </div>
    )
}
