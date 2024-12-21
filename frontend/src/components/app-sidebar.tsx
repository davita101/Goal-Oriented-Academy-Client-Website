import * as React from "react"
import {
  AudioWaveform,
  Bot,
  ChartNoAxesCombined,
  Command,
  GalleryVerticalEnd,
  Inbox,
  KeyboardMusic,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SearchForm } from "./search-form"
import { ScrollArea } from "./ui/scroll-area"


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
          title: "More...",
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
          title: "Account",
          url: "#",
        },
        {
          title: "Events",
          url: "#",
        },
        {
          title: "Salary",
          url: "#",
        },
        {
          title: "Cards",
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
      <ScrollArea>
        <SidebarHeader className="sticky top-0 z-[2]">
          <NavUser user={data.user} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavMain items={data.projects} />
        </SidebarContent>
        <SidebarRail />
      </ScrollArea>
    </Sidebar>
  );
}