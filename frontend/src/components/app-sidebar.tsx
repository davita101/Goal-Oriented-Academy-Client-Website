import * as React from "react"
import {
  CalendarDays,
  ChartBarIncreasing,
  ChartColumnStacked,
  ComputerIcon,
  FileText,
  Inbox,
  SquareTerminal,
  UserRoundPen,
} from "lucide-react"

import { AsideDashboard } from "@/components/aside-dashboard"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ScrollArea } from "./ui/scroll-area"
import { useParams } from "react-router-dom"
import { NavProjects } from "./nav-projects"
import Tree from "./ui/sidebar-tree"



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
        isActive: true,
        items: [
          {
            title: "Default",
            url: "/dashboard/default",
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
    controllers: [
      {
        title: "Mentor",
        url: "/mentor",
        icon: ComputerIcon,
        isActive: true,
        items: [
          {
            title: "Rating",
            url: "/controller/mentor/rating",
            items: [
              {
                title: "Cards",
                url: "/controller/mentor/cards",
              },
              {
                title: "GithubCheck",
                url: "/controller/squad-member",
              },
            ],
          },
          {
            title: "More...",
            url: "#",
          },
        ],
      },
    ],
    tree: [
      [
        "Mentor",
        [
          "Rating",
          "Github-Check",
        ],
        ["Exams", "Exam-one", "Exam-two"],
        "Data",
        "Cards",
        "Rating",
        "Charts",
      ],
      [
        "Mentor-Assistant",
        [
          "Rating",
          "Github-Check",
        ],
        ["Exams", "Exam-one", "Exam-two"],
        "Data",
        "Cards",
        "Rating",
        "Charts"
      ],
      [
        "Leaders",
        [
          "Rating",
          "Github-Check",
          "Leader-Codewars",
          "Leader-Github",
          "Parent-Rating",
        ],
        ["Exams", "Exam-one", "Exam-two"],
        ["Github-Check",
          "First-Check", "Second-Check",
        ],
        "Cards",
        "Rating",
        "Charts"
      ],
      [
        "Mini-Leaders",
        [
          "Rating",
          "Github-Check",
        ],
        ["Github-Check",
          "First-Check", "Second-Check",
        ],
        "Cards",
        "Rating",
        "Charts"
      ],
      [
        "Mini-Mentor",
        [
          "Rating",
          "Github-Check",
        ],
        ["Exams", "Exam-one", "Exam-two"],
        "Cards",
        "Rating",
        "Charts"
      ],
    ],

  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <ScrollArea>
        <SidebarHeader className="sticky top-0 z-[2]">
          <NavUser user={data.user} />
        </SidebarHeader>
        <SidebarContent>
          <AsideDashboard items={data.navMain} title="Dashboard" />
          <NavProjects items={data.widgets} title="Widgets" />
          <NavProjects items={data.applications} title="Applications" />
          <SidebarMenu>
            <SidebarHeader>Controllers</SidebarHeader>
            {data.tree.map((item, index) => (
              <Tree key={index} item={item} />
            ))}
          </SidebarMenu>
          <SidebarMenu>
            <SidebarHeader>Admin</SidebarHeader>
            <b>{"COMING SOON..."}</b>
          </SidebarMenu>
        </SidebarContent>
        <SidebarRail />
      </ScrollArea>
    </Sidebar>
  );
}