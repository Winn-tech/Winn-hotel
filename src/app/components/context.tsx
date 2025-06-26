'use client'
import React from 'react'
import { useState } from 'react'
import { createContext, ReactNode, useEffect } from 'react'
import {checkAuthStatus} from '@/app/_lib/actions'
import {DateRange} from 'react-day-picker';

interface MainContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void,
  selected?: DateRange | undefined
  setSelected?: (value: DateRange | undefined) => void
}

const MainContext = createContext<MainContextType | undefined>(undefined)

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false)
  useEffect(() => {
      const checkAuth = async () => {
        const {isLoggedIn} = await checkAuthStatus();
        setIsLogged(isLoggedIn);
      }
      checkAuth();
    }, [isLogged])


  const [selected, setSelected] = useState<DateRange | undefined>({ from: undefined, to: undefined });



  const value: MainContextType = {
    isLoggedIn: isLogged,
    setIsLoggedIn: setIsLogged,
    selected: selected,
    setSelected: setSelected
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