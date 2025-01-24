import React from 'react'
import { Separator } from '../../components/ui/separator'
import { accountEditArr } from '../../utils'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import Profile from './Profile'
import Account from './Account'
import { t } from 'i18next'
import { ChevronRight, Pencil, PenOff } from 'lucide-react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../../components/ui/resizable'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { useAuthStore } from '../../store/authStore'

export default function ProfileRoutes() {
  const path = window.location.pathname
  const navigate = useNavigate()
  const { user } = useAuthStore()
  React.useEffect(() => {
    if (path == "/applications/profile-edit") {
      navigate("/applications/profile-edit/profile")
    }
  }, [])
  return (
    <div className='p-4 absolute top-0 w-full bg-background overflow-hidden z-[1] pt-20 '>
      <div className=''>
        <h2 className='font-bold sm:text-2xl text-xl '>Profile</h2>
        <p className='dark:text-stone-100 text-stone-500'>Manage your account settings and set nickname preferences.</p>
        {/* //? profile up */}
        <div className="font-bold my-4 sm:text-xl text-sm capitalize flex items-center juc">
          <React.Fragment>
            <div className='flex items-center'>
              {t("applications")}
              <ChevronRight size={20} className="sm:mt-1.5 mt-0" color="hsl(var(--primary))" />
            </div>
            <div className=' flex items-center'>
              {t("profile Edit")}
              <ChevronRight size={20} className="sm:mt-1.5 mt-0" color="hsl(var(--primary))" />
              {t(path.split("/")[3])}
            </div>
          </React.Fragment>
        </div>
      </div>
      {/* //* DESKTOP */}
      <div className=''>
        {/* //? resize group */}
        <ResizablePanelGroup
          direction="horizontal"
          className="w-screen rounded-lg border"
        >
          <ResizablePanel defaultSize={15} maxSize={15} >
            <div>
              <Avatar className=" size-50 object-cover rounded-none">
                <AvatarImage className=' object-cover' src={user?.user?.avatar} alt={`Goal oriented academy user ${user?.user?.name}`} />
                <AvatarFallback className="aspect-square  rounded-lg capitalize">{user?.user?.name.split(/\s+/)[0].slice(0, 1)}{user?.user?.name.split(/\s+/)[1].slice(0, 1)}</AvatarFallback>
              </Avatar>
              <h2 className='p-2 font-bold max-sm:hidden'>{user?.user?.nickname}</h2>
            </div>
            <Separator className='dark:bg-white bg-black mt-1' />
            <ul className='flex flex-col items-start'>
              {accountEditArr.map((item, index) => (
                <li key={`settings-${item}`}>
                  <div className='flex flex-col max-sm:hidden items-start '>
                    <Link to={`/applications/profile-edit/${item}`} className=' hover:bg-stone-100 rounded-md w-56'>
                      <Button className='w-full  font-bold dark:text-foreground dark:hover:text-background flex items-center justify-start' variant={'link'}>{item}</Button>
                    </Link>
                  </div>
                  <div className='flex flex-col sm:hidden items-start '>
                    <Link to={`/applications/profile-edit/${item}`} className=' hover:bg-stone-100 rounded-md w-56'>
                      <Button className='w-full p-2 font-bold dark:text-foreground dark:hover:text-background flex items-center justify-start' variant={'link'}>{(index == 0) ? <Pencil /> : <PenOff />}</Button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <Routes >
              <Route path="/profile" element={<Profile />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}