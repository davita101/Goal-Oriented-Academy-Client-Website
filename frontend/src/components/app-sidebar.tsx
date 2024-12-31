import * as React from "react"
import {
  Book,
  BookA,
  BookCopy,
  BookMarked,
  CalendarDays,
  ChartBarIncreasing,
  ChartColumnStacked,
  FileText,
  GalleryVertical,
  Inbox,
  MonitorCog,
  Presentation,
  SquareTerminal,
  UserRoundPen,
} from "lucide-react"

import { AsideDashboard } from "@/components/aside-dashboard"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ScrollArea } from "./ui/scroll-area"
import { useParams } from "react-router-dom"
import { NavProjects } from "./nav-projects"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { userId } = useParams<{ userId: string }>();
  // This is sample data.
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: SquareTerminal,
        items: [
          {
            title: "Default",
            url: "/dashboard",
          },
          {
            title: "Analytics",
            url: "/dashboard/analytics",
          },
          {
            title: "More...",
            url: "#",
          },
        ],
      },
    ],

    widgets:
      [
        {
          name: "all",
          url: "/widgets",
          icon: GalleryVertical,
        },
        {
          name: "Statistics",
          url: "/widgets/statistics",
          icon: ChartBarIncreasing,

        },
        {
          name: "Data",
          url: "/widgets/data",
          icon: FileText,
        },
        {
          name: "Charts",
          url: "/widgets/charts",
          icon: ChartColumnStacked,
        },
      ],
    applications: [
      {
        name: "all",
        url: "/applications",
        icon: GalleryVertical,
      },
      {
        name: "Inbox",
        url: "/applications/inbox",
        icon: Inbox,
      },
      {
        name: "Calendar",
        url: "/applications/calendar",
        icon: CalendarDays,
      },
      {
        name: "Profile",
        url: "/applications/profile",
        icon: UserRoundPen,
      },
    ],
    controls:
      [
        {
          name: "all",
          url: "/controls",
          icon: GalleryVertical,
        },
        {
          name: "Students",
          url: "/controls/students",
          icon: Book,
        },
        {
          name: "Leader",
          url: "/controls/leader",
          icon: BookCopy,

        },
        {
          name: "Mini Leader",
          url: "/controls/mini-leader",
          icon: BookA,
        },
        {
          name: "Mini students",
          url: "/controls/mini-students",
          icon: BookMarked,
        },
        {
          name: "Mentor",
          url: "/controls/mentor",
          icon: Presentation,
        },
        {
          name: "Mentor Assistant",
          url: "/controls/mentor-assistant",
          icon: MonitorCog,
        },
      ],


  }
  return (

    <Sidebar collapsible="icon" {...props} className="data-[state=open]">
      <ScrollArea>
        <SidebarHeader className="sticky top-0 z-[2]">
          <NavUser user={data.user} />
        </SidebarHeader>
        <SidebarContent>
          <AsideDashboard items={data.navMain} title="Dashboard" />
          <NavProjects items={data.widgets} title="Widgets" />
          <NavProjects items={data.applications} title="Applications" />
          <NavProjects items={data.controls} title="Controls" />
        </SidebarContent>
        <SidebarRail />
      </ScrollArea>
    </Sidebar>

  );
}