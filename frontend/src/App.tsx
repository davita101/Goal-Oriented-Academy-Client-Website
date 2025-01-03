import * as React from "react";
import { JSX } from "react";
import { AppSidebar } from "./components/app-sidebar";
import { NavigationMenuNotification } from "./components/nav-notification";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import ToggleDarkMode from "./components/ui/togle-dark-mode";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./page/NotFound";
import { ProtectedRoute, RedirectAuthenticatedUser } from "./utils/protected-routes";
import Login from "./page/Login";
import { useAuthStore } from "./store/authStore";
import Dashboard from "./page/Dashboard";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLogin, checkAuth } = useAuthStore();

  const path = location.pathname;

  React.useEffect(() => {
    checkAuth()
  }, [checkAuth])

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);


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
    );
  };

  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "250px",
          } as React.CSSProperties
        }
      >
        {isLogin && (<AppSidebar />)}

        <SidebarInset>
          {true && (<header className="sticky top-0 left-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-[2]">
            <SidebarTrigger className="-ml-1" />
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
                <ToggleDarkMode />
              </div>
            </Breadcrumb>
          </header>)}
          <div>
            <Routes>
              <Route path="/login" element={
                <RedirectAuthenticatedUser>
                  <Login />
                </RedirectAuthenticatedUser>
              } />
              <Route path="/*" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}