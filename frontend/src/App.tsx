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
import { RedirectAuthenticatedUser } from "./hooks/protected-routes";
import Login from "./page/Login";
import { useAuthStore } from "./store/authStore";
import DashboardRoutes from "./routes/dashboard-routes";
import MentorRoutes from "./routes/mentor-routes";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/language-switcher";
import StudentRotes from "./routes/student-rotes";
import ApplicationsRoutes from "./routes/applications-routes";

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

    return (
        <>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "250px",
                    } as React.CSSProperties
                }
                className="font-primary"
            >
                {localStorage?.getItem("authLogin") == "true" && (<AppSidebar />)}

                <SidebarInset>
                    {(<header
                        className="sticky top-0 left-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-[2]">
                        {localStorage?.getItem("authLogin") == "true" && (<SidebarTrigger className="-ml-1" />)}
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb className="flex-1 flex justify-between items-center">
                            <div>
                                {localStorage?.getItem("authLogin") == "true" && (
                                    <BreadcrumbList className='max-sm:hidden'>
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbLink href={`/dashboard`}>{t("home")}</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <>
                                            <BreadcrumbSeparator className="hidden md:block" />
                                            {path.split("/").map((name, index) => {
                                                if (name === "") return null;
                                                return (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <BreadcrumbLink href={`/${path.split("/").slice(1, index + 1).join("/")}`}>{t(name)}</BreadcrumbLink>
                                                        <BreadcrumbSeparator />
                                                    </div>
                                                )
                                            })}
                                        </>
                                    </BreadcrumbList>
                                )}

                            </div>
                            <div className="flex gap-2">
                                {localStorage?.getItem("authLogin") == "true" && (
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
                            {/* //! ROUTES */}
                            <Route path="/dashboard/*" element={<DashboardRoutes />} />
                            <Route path="/mentor/*" element={<MentorRoutes />} />
                            <Route path="/students/*" element={<StudentRotes />} />
                            <Route path="/applications/*" element={<ApplicationsRoutes />} />
                        </Routes>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}