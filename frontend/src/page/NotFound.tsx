import * as React from 'react'
import notFoundImage from "../assets/404.png"
export default function NotFound() {
  return (
    <div className='w-full h-[90vh] flex justify-center items-center flex-col '>
      <h1 className='text-4xl font-bold'>404 Not Found</h1>
      <img src={notFoundImage} alt='404' className='w-1/4 animate-ping duration-5000' />
    </div>
  )
}
