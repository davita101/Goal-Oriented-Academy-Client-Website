import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createEvent } from '../../schema/(lessonEvent)/form'
import { Navigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { z } from 'zod'
import generateHexId from '../../utils/generateHexId'
import { useLessonEventStore } from '../../store/lessonEventStore'
import { useMentorStore } from '../../store/mentorStore'
import useErrorHandle from '../../hooks/use-popup-handle'

export default function LessonEventGroup() {
  const startDate = new Date()


  const { groupId } = useParams()
  const { createLessonEvent, lessonsEvent } = useLessonEventStore()
  useEffect(() => {
    if (groupId) {
      createLessonEvent(groupId, data)
    }
    //? window.location.href = (`/mentor/group/startEvent/${groupId}/${lessonEventId}`)
  }, [lessonsEvent, createLessonEvent])
  const form = useForm({
    resolver: zodResolver(createEvent),
    defaultValues: {
      _id: generateHexId(),
      group: Number(groupId),
      name: `lesson-`,
      isActive: true,
      description: '',
      startDate: startDate,
    }
  })
  const onSubmit = async (data: z.infer<typeof createEvent>) => {
    let responseStatus
    if (groupId) {
      responseStatus = await createLessonEvent(groupId, data)
    }
    useErrorHandle(responseStatus)
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
    <div className='p-2 flex justify-center items-center h-screen mt-[-5rem] '>
      <div className='w-[500px]'>
        <div className='w-full'>
          <h1 className='text-2xl font-bold'>Create Event</h1>
          <h2 className='text-xl'>Group {groupId}</h2>
          <Form
            {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-4 '
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
                        value={item.name === "group" ? Number(groupId) : field.value}
                      />
                      <FormMessage>{error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              ))}
              <Button
                variant={"green"}
                type='submit' >Submit</Button>
            </form>
          </Form >
        </div>
      </div>
    </div>
  )
}