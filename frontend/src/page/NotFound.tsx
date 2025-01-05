import * as React from 'react'
import notFoundImage from "../assets/404.png"
import { useTranslation } from 'react-i18next'
export default function NotFound() {
  const {t } = useTranslation()
  return (
    <div className='w-full h-[90vh] flex justify-center items-center flex-col overflow-hidden '>
      <h1 className='text-4xl font-bold'>404 {t("Not Found")}</h1>
      <img src={notFoundImage} alt='404' className='w-1/4 animate-ping duration-5000' />
    </div>
  )
}
