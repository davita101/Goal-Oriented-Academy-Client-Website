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
import { Separator } from "./components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import ToggleDarkMode from "./components/ui/togle-dark-mode";

import { Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "./page/NotFound";
import { RedirectAuthenticatedUser } from "./utils/protected-routes";
import Login from "./page/Login";
import { useAuthStore } from "./store/authStore";
import DashboardRoutes from "./routes/dashboard-routes";
import MentorRoutes from "./routes/mentor-routes";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/language-switcher";
import StudentRotes from "./routes/student-rotes";

export default function AppRoutes() {
  const { t } = useTranslation();
  const { user, checkAuth, isLogin } = useAuthStore();
  const [loading, setLoading] = React.useState(true);

  const path = location.pathname;
  const navigate = useNavigate();

  React.useEffect(() => {
    const authenticate = async () => {
      await checkAuth();
      setLoading(false);
    };
    authenticate();
  }, [checkAuth]);

  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, navigate, loading]);

  const BreadRender = (name: string): JSX.Element => {
    return (
      <>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href={`/${name}`}>{t(name)}</BreadcrumbLink>
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
        {(isLogin && user?.success) && (<AppSidebar />)}

        <SidebarInset>
          {(<header className="sticky top-0 left-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-[2]">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="flex-1 flex justify-between items-center">
              <div>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href={`/dashboard`}>{t("home")}</BreadcrumbLink>
                  </BreadcrumbItem>
                  {isLogin && (
                    <>
                      <BreadcrumbSeparator className="hidden md:block" />
                      {path.includes(`/dashboard`) && BreadRender("dashboard")}
                      {path.includes(`/widgets`) && BreadRender("widgets")}
                      {path.includes(`/applications`) && BreadRender("applications")}
                      {path.includes(`/controls`) && BreadRender("controls")}
                      {path.includes(`/mentor`) && BreadRender("mentor/group")}
                    </>
                  )}
                </BreadcrumbList>
              </div>
              <div className="flex gap-2">
                {user?.success && (
                  <div className="flex gap-4">
                    <LanguageSwitcher />

                    <NavigationMenuNotification />
                  </div>
                )}
                <ToggleDarkMode />
              </div>
            </Breadcrumb>
          </header>)}
          <div>
            <Routes>
              <Route path="/login" element={
                <RedirectAuthenticatedUser>
                  {<Login />}
                </RedirectAuthenticatedUser>
              } />

              (!loading ? <Route path="*" element={<NotFound />} />)

              <Route path="/dashboard/*" element={<DashboardRoutes />} />
              <Route path="/mentor/*" element={<MentorRoutes />} />
              <Route path="/students/*" element={<StudentRotes />} />
            </Routes>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}