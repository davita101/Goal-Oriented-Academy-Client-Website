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

export function NavUser() {
  const { isMobile } = useSidebar()
  const { user, logout, oneLeaderStudent, oneLeaderStudentArr } = useAuthStore()

  const handleLogout = () => {
    logout(user.user?.email)
  }
  React.useEffect(() => {
    oneLeaderStudent(user?.user?._id)
  }, [user?.user._id, oneLeaderStudent])
  return (
    <SidebarMenu >
      <SidebarMenuItem >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
                  <Bolt size={18} />
                  Roles <span>{user?.user?.role.length}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-1">
                  <ClipboardX size={18} />
                  Cards <span>{
                    user?.user?.rating?.cards?.leaderCards.black +
                    user?.user?.rating?.cards?.leaderCards.green +
                    user?.user?.rating?.cards?.leaderCards.purple +
                    user?.user?.rating?.cards?.leaderCards.yellow +

                    user?.user?.rating?.cards?.mentorCards.black +
                    user?.user?.rating?.cards?.mentorCards.green +
                    user?.user?.rating?.cards?.mentorCards.purple +
                    user?.user?.rating?.cards?.mentorCards.yellow
                  }</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup className="grid grid-cols-2 w-full">
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="grid grid-cols-2  ">
              <DropdownMenuItem>
                {oneLeaderStudentArr.length} <span>Squad Members</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {oneLeaderStudentArr.filter(student => student.role === "miniLeader").length} <span>Mini Leader</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-400 hover:text-slate-400 ">
                <X /> <span>Groups</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-400 hover:text-slate-400 " >
                <X /> <span>Mini Member</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-slate-400 hover:text-slate-400 ">
              <X />
              <BadgePercent />
              <span>salary</span>
            </DropdownMenuItem>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleLogout()}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
