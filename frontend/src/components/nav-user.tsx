import {
  BadgePercent,
  Bolt,
  ChevronsUpDown,
  ClipboardX,
  LogOut,
  X,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar"
import * as React from "react"
import { useAuthStore } from "../store/authStore"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import { Button } from "./ui/button"
import { useLeaderStore } from "../store/leaderStore"
import { useTranslation } from "react-i18next"

export function NavUser() {
  const { isMobile } = useSidebar()
  const { user, logout } = useAuthStore()
  const {getLeaderStudents, leaderStudents } = useLeaderStore()
  const { t } = useTranslation()

  const handleLogout = () => {
    logout(user.user?.email)
  }
  React.useEffect(() => {
    getLeaderStudents(user?.user?._id)
  }, [user?.user._id, getLeaderStudents])
  return (
    <SidebarMenu className="mt-[-.5rem]">
      <SidebarMenuItem >
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="dark:bg-[var(--background)] bg-slate-50 mt-0">
            <SidebarMenuButton
              size="lg"
              className=" data-[state=open]:bg-gray-100 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.user?.avatar} alt={`Goal oriented academy user ${user?.user?.name}`} />
                <AvatarFallback className="rounded-lg capitalize">{user?.user?.name.split(/\s+/)[0].slice(0, 1)}{user?.user?.name.split(/\s+/)[1].slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.user?.name}</span>
                <span className="truncate text-xs">{user?.user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-[330px] rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.user?.avatar} alt={`Goal oriented academy user ${user?.user?.avatar}`} />
                  <AvatarFallback className="rounded-lg capitalize">{user?.user?.name.split(/\s+/)[0].slice(0, 1)}{user?.user?.name.split(/\s+/)[1].slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.user?.name}</span>
                  <span className="truncate text-xs">{user?.user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="grid grid-cols-2 w-full">
              <DropdownMenuItem>
                <div className="flex items-center gap-1">

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button className=" w-[140px]"><Bolt size={18} />{t("role")} <span>{user?.user?.role.length}</span></Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-40 duration-100">
                      {user?.user?.role.map((role: string) =>
                        <div key={`${role}`} className="flex justify-between">
                          <span>{t(role)}</span>
                        </div>
                      )}
                    </HoverCardContent>
                  </HoverCard >
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-1 text-slate-400 hover:text-slate-400">
                  <ClipboardX size={18} />
                  {t("cards")} <span>{
                  }</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup className="grid grid-cols-2 w-full">
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="grid grid-cols-2  ">
              <DropdownMenuItem>
                {leaderStudents.length} <span>{t("squad member")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {leaderStudents.filter(student => student.role === "miniLeader").length} <span>{t("mini")} {t("leader")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-400 hover:text-slate-400 ">
                <X /> <span>{t("group")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-400 hover:text-slate-400 " >
                <X /> <span>{t("mini")} {t("member")}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-slate-400 hover:text-slate-400 ">
              <X />
              {/* <BadgePercent /> */}
              <span>{t("salary")}</span>
            </DropdownMenuItem>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleLogout()}>
                <LogOut />
                {t("log out")}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
