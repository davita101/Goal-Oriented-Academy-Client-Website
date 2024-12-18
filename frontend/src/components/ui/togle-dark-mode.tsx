import { Sun, Moon } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const ToggleDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const cookieTheme = Cookies.get('theme')
    const isDark = cookieTheme === 'dark' || (!cookieTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
    setIsDarkMode(isDark)
  }, [])

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', !isDarkMode)
    Cookies.set('theme', newTheme, { expires: 365 })
    setIsDarkMode(!isDarkMode)
  }

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? <Moon /> : <Sun />}
    </button>
  )
}

export default ToggleDarkMode