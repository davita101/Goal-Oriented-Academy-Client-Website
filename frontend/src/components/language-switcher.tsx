import * as React from "react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "./ui/navigation-menu"
import { ScrollArea } from "./ui/scroll-area"
import { cn } from "../lib/utils";
import { Languages } from "lucide-react";
import i18n from "../i18n";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "",
        href: "",
        description:
            "ka",
    },
    {
        title: "",
        href: "",
        description:
            "en",
    },
]

export default function LanguageSwitcher() {
    const [language, setLanguage] = React.useState();
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("i18nextLng", lng);
      };
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger><Languages /></NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ScrollArea className="rounded-md border">
                            <ul className="w-[50px] gap-3 z-[999] ">
                                <ListItem key={"ka"} onClick={() => changeLanguage("ka")}>ka</ListItem>
                                <ListItem key={"en"} onClick={() => changeLanguage("en")}>en</ListItem>
                            </ul>
                        </ScrollArea>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
const ListItem = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <div
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </div>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"




