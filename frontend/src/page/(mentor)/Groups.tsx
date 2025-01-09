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

const numbers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100
];

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
                                ? numbers.find((number) => number === value)
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
                                    {numbers.map((framework) => (
                                        <CommandItem
                                            key={framework}
                                            value={framework.toString()}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value?.toString() ? null : Number(currentValue))
                                                setOpen(false)
                                                window.location.href = `group/${currentValue}`
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