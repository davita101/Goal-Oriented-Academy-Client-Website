import * as React from "react"
import {
  AudioWaveform,
  BadgePercent,
  BookOpen,
  Bot,
  ChartNoAxesCombined,
  CircleEllipsis,
  ClipboardX,
  Command,
  Frame,
  GalleryVerticalEnd,
  HeartHandshake,
  Inbox,
  KeyboardMusic,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  WalletCardsIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Item } from "@radix-ui/react-dropdown-menu"
import { title } from "process"
import { SearchForm } from "./search-form"


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Squad",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All Squad Members",
          url: "#",
        },
        {
          title: "Mini Leaders",
          url: "lomi",
        },
        {
          title: "Mini Members",
          url: "#",
        },
        {
          title: "Members",
          url: "#",
        },
      ],
    },
    {
      title: "leader Info",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Codwars",
          url: "#",
        },
        {
          title: "LinckedIn",
          url: "#",
        },
        {
          title: "Facebook",
          url: "#",
        },
        {
          title: "ParentFacebook",
          url: "#",
        },
        {
          title: "Github",
          url: "#",
        },
      ],
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      items: [
        {
          title: "Leader",
          url: "#",
        },
        {
          title: "Mini Leader",
          url: "#",
        },
        {
          title: "Mini Member",
          url: "#",
        },
        {
          title: "Mentor",
          url: "#",
        },
        {
          title: "Mentor Assistant",
          url: "#",
        }
      ],
    },
  ],

  projects: [
    {
      title: "Other",
      url: "#",
      icon: CircleEllipsis,
      items: [
        {
          title: "Events",
          url: "#",
        },
        {
          title: "Cards",
          url: "#",
        },
        {
          title: "Salary",
          url: "#",
        }
      ]
    },
    {
      title: "For Control",
      url: "#",
      icon: KeyboardMusic,
      items: [
        {
          title: "Github",
          url: "#",
        },
        {
          title: "Leader",
          url: "#",
        },
        {
          title: "Mini Leader",
          url: "#",
        },
        {
          title: "Mini Member",
          url: "#",
        },
        {
          title: "Mentor",
          url: "#",
        },
        {
          title: "Mentor Assistant",
          url: "#",
        }
      ]
    },
    {
      title: "Data",
      url: "#",
      icon: ChartNoAxesCombined,
      items: [
        {
          title: "Leader Checkup",
          url: "#",
        },
        {
          title: "Leader Rating",
          url: "#",
        },
        {
          title: "Mini Leader Checkup",
          url: "#",
        },
        {
          title: "Mini Leader Rating",
          url: "#",
        },
        {
          title: "Mini Member Checkup",
          url: "#",
        },
        {
          title: "Mini Member Rating",
          url: "#",
        },
        {
          title: "Mentor Rating Checkup",
          url: "#",
        },
        {
          title: "Mentor Rating Rating",
          url: "#",
        },
        {
          title: "Mentor Checkup",
          url: "#",
        },
        {
          title: "Mentor Rating",
          url: "#",
        },
        {
          title: "Mentor Assistant Checkup",
          url: "#",
        },
        {
          title: "Mentor Assistant Rating",
          url: "#",
        }
      ]
    }
  ]
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader >
        <NavUser user={data.user} />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavMain items={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
