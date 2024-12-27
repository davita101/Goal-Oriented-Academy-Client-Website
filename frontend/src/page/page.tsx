import React from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { NavigationMenuNotification } from "@/components/nav-notification"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import ToggleDarkMode from "@/components/ui/togle-dark-mode"

import { Route, Routes, useLocation } from "react-router-dom"
import Dashboard from './Dashboard'
import Account from './Account'
import { Toaster } from '@/components/ui/sonner'

export default function User() {
  const location = useLocation();
  const path = location.pathname;
  const userId = path.split('/')[2]
  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "350px",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 left-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-[2]">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="flex-1 flex justify-between items-center">
              <div >
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href={`/dashboard/${userId}/`}>home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  {path.includes(`/dashboard/${userId}/`) && (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={`/dashboard/${userId}/`}>dashboard</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </>
                  )}
                  {path === `/dashboard/${userId}/all-squad-member` && (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">All Squad Members</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </>
                  )}
                  {path === `/dashboard/${userId}/all-leader-info` && (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">All Leader info</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </>
                  )}
                  {path === `/dashboard/${userId}/all-inboxes` && (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </>
                  )}
                  {path === `/dashboard/${userId}/account` && (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">account</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </>
                  )}
                </BreadcrumbList>
              </div>
              <div className="flex gap-2">
                <NavigationMenuNotification />
                <Input
                  placeholder="Search Student"
                  className=" h-10 w-56 sm:block hidden"
                />
                <ToggleDarkMode />
              </div>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Routes>
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              {/* <Route path="/account" element={<Account />} /> */}
              {/* <Route path="/all-squad-member" element={<DataTable />} /> */}
              {/* <Route path="/lomi" element={<h1>davit</h1>} /> */}
            </Routes>
       
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
