'use client'
import React from 'react'
import { createContext, ReactNode, useEffect } from 'react'
import {checkAuthStatus} from '@/app/_lib/actions'

interface MainContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
}

const MainContext = createContext<MainContextType | undefined>(undefined)

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = React.useState<boolean>(false)
  useEffect(() => {
      const checkAuth = async () => {
        const {isLoggedIn} = await checkAuthStatus();
        setIsLogged(isLoggedIn);
      }
      checkAuth();
    }, [isLogged])

  const value: MainContextType = {
    isLoggedIn: isLogged,
    setIsLoggedIn: setIsLogged
  }

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  )
}

// Optional: Custom hook for easier usage
export const useMainContext = () => {
  const context = React.useContext(MainContext)
  if (context === undefined) {
    throw new Error('useMainContext must be used within a MainProvider')
  }
  return context
}

export default MainContext