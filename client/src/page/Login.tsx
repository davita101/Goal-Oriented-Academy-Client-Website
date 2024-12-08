import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'

export default function Login() {
  
  return (
    <div className='max-w-[600px] mx-auto h-screen w-full flex items-center justify-center'>
      <Card>
        Goa
      </Card>
      <Card className='p-2 w-full mx-2'>
        <Input
          placeholder='Enter email'
        />
        <Button variant='outline' className='w-full mt-2'>submit</Button>
      </Card>
    </div>
  )
}
