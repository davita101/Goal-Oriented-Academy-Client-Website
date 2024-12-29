import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar"
import { NavigationMenuNotification } from "@/components/nav-notification"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
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
import Dashboard from "./Dashboard";

export default function User() {
  const location = useLocation();
  const path = location.pathname;
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
                    <BreadcrumbLink href={`/dashboard`}>home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  {path.includes(`/dashboard`) && (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={`/dashboard`}>dashboard</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      {!path.includes(`/dashboard/dashboard`) && (
                        <>
                          <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href={`${path}`}>{path.replace("dashboard", "").replace(/\/+/g, "")}</BreadcrumbLink>
                          </BreadcrumbItem>
                        </>
                      )}

                    </>
                  )}
                   {path.includes(`/widgets`) && (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={`/widgets`}>widgets</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      {!path.includes(`/widgets/widgets`) && (
                        <>
                          <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href={`${path}`}>{path.replace("widgets", "").replace(/\/+/g, "")}</BreadcrumbLink>
                          </BreadcrumbItem>
                        </>
                      )}

                    </>
                  )}
                   {path.includes(`/applications`) && (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={`/applications`}>applications</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      {!path.includes(`/applications/applications`) && (
                        <>
                          <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href={`${path}`}>{path.replace("applications", "").replace(/\/+/g, "")}</BreadcrumbLink>
                          </BreadcrumbItem>
                        </>
                      )}

                    </>
                  )}
                   {path.includes(`/controls`) && (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={`/controls`}>controls</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      {!path.includes(`/controls/controls`) && (
                        <>
                          <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href={`${path}`}>{path.replace("controls", "").replace(/\/+/g, "")}</BreadcrumbLink>
                          </BreadcrumbItem>
                        </>
                      )}

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
          <div >
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
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
