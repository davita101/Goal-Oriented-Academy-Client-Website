import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../../components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { groups } from "../../utils"
import generateHexId from "../../utils/generateHexId"



export default function Groups() {
    const [open, setOpen] = React.useState(true)
    const [value, setValue] = React.useState<number | null>(null)

    return (
        <div className="absolute top-0 left-0 right-0 flex justify-center items-center h-screen">
            <div className="flex flex-col gap-2">
                <span className="font-bold text-xl">Groups</span>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className=" lg:w-[800px] w-[300px]  justify-between"
                        >
                            {value !== null
                                ? groups.find((number) => number === value)
                                : "Select Group..."}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="lg:w-[800px] w-[300px] p-0">
                        <Command>
                            <CommandInput placeholder="Search Group..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                    {groups.map((framework) => (
                                        <CommandItem
                                            key={framework}
                                            value={framework.toString()}
                                            onSelect={(groupId) => {
                                                setValue(groupId === value?.toString() ? null : Number(groupId))
                                                setOpen(false)
                                                window.location.href = `event/${generateHexId()}/${groupId}`
                                            }}
                                        >
                                            {framework}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    value === framework ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}