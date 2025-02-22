import { Check } from 'lucide-react'
import React from 'react'
import { toast } from './use-toast'

export default function useErrorHandle(status: number) {
    if (status === 201) {
        toast({
            title: "You created the event successfully",
            variant: "success",
            description: (<Check />),
        })
    } else if (status === 409) {
        toast({
            title: "Error",
            variant: "destructive",
            description: "Event already created",
        })
    } else if (status === 500) {
        toast({
            title: "Error",
            variant: "destructive",
            description: "Internal Server Error",
        })
    } else if (status == 204) {
        toast({
            title: "No data",
            variant: "destructive",
            description: "No content",
        })
    }

}
