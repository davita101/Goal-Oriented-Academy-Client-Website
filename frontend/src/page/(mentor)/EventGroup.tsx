import React, { useEffect } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createEvent } from '../../schema/(event)/form';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { cn } from '../../lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../../components/ui/calendar';
import { toast } from '../../hooks/use-toast';
import { z } from 'zod';

export default function EventGroup() {
  const startDate = new Date()
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000) //! 2 hours later

  const { groupId } = useParams()
  const form = useForm({
    resolver: zodResolver(createEvent),
    defaultValues: {
      group: groupId || '',
      name: `lesson-`,
      isActive: false,
      description: '',
      startDate: startDate,
      endDate: endDate,
    }
  });
  const onSubmit = (data: z.infer<typeof createEvent>) => {
    form.reset()
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    console.log(data.endDate, data.startDate)
  }
  const data = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Name',
    },
    {
      name: 'description',
      type: 'text',
      placeholder: 'description',
    },

    {
      name: 'group',
      type: 'number',
      placeholder: 'group',
      value: groupId
    },

  ]
  return (
    <>
      <h1 className='text-2xl font-bold text-center'>Create Event</h1>
      <h2 className='text-xl text-center'>Group {groupId}</h2>
      <Form
        {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-4 p-4 max-w-80 mx-auto'
        >
          {data.map((item, index) => (
            <FormField
              key={index}
              control={form.control}
              name={item.name as "group"}
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <Input
                    {...field}
                    placeholder={item.placeholder}
                    type={item.type}
                    className='border border-gray-300 rounded-md p-2'
                  />
                  <FormMessage >{error?.message}</FormMessage>
                </FormItem>
              )}
            />
          ))}
          <FormField
            control={form.control}
            name={"startDate"}
            render={({ field, fieldState: { error } }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? new Date(field.value).toLocaleDateString('en-US') : "Select a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your start date is used to calculate the event duration.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={"green"}
            type='submit' >Submit</Button>
        </form>
      </Form >
    </>
  )
}