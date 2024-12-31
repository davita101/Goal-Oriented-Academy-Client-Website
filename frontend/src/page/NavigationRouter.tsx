import * as React from "react"
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
import Dashboard from "./Dashboard"
import NotFound from "./NotFound"

export default function NavigationRouter() {
  const location = useLocation()
  const path = location.pathname
  const [isOpen, setIsOpen] = React.useState(() => {
    const savedState = localStorage.getItem("navigationState")
    return savedState ? JSON.parse(savedState) : false // Default to closed
  })

  React.useEffect(() => {
    localStorage.setItem("navigationState", JSON.stringify(isOpen))
  }, [isOpen])

  const handleOpen = () => {
    setIsOpen((prevState: boolean) => !prevState)
  }

  const BreadRender = (name: string): JSX.Element => {
    return (
      <>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href={`/${name}`}>{name}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        {!path.includes(`/${name}/${name}`) && (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={`${path}`}>{path.replace(`${name}`, "").replace(/\/+/g, "")}</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </>
    )
  }

  return (
    <>
      <SidebarProvider
        open={isOpen}
        style={
          {
            "--sidebar-width": "350px",
          } as React.CSSProperties
        }
      >
        <AppSidebar />

        <SidebarInset>
          <header className="sticky top-0 left-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-[2]">
            <SidebarTrigger className="-ml-1" onClick={handleOpen} />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="flex-1 flex justify-between items-center">
              <div>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href={`/dashboard`}>home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  {path.includes(`/dashboard`) && BreadRender("dashboard")}
                  {path.includes(`/widgets`) && BreadRender("widgets")}
                  {path.includes(`/applications`) && BreadRender("applications")}
                  {path.includes(`/controls`) && BreadRender("controls")}
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
          <div>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/*" element={<NotFound />} />
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