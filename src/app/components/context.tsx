'use client'
import React from 'react'
import { useState } from 'react'
import { createContext, ReactNode, useEffect, Dispatch, SetStateAction } from 'react'
import {checkAuthStatus} from '@/app/_lib/actions'
import {DateRange} from 'react-day-picker';

interface MainContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void,
  selected?: DateRange | undefined
  setSelected?: (value: DateRange) => void
  collapsed : boolean
  setCollapsed : Dispatch<SetStateAction<boolean>> ,
  toggleSidebar : () => void 
  guests : number | undefined,
  setGuests : Dispatch<SetStateAction<number | undefined>>
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
    }, [])


  const [selected, setSelected] = useState<DateRange | undefined>({ from: undefined, to: undefined });
  const [collapsed, setCollapsed] = useState(true);
  const [guests, setGuests] = useState<number | undefined >();



  const toggleSidebar = () => {
    setCollapsed(prev => !prev); 
  };

  const value: MainContextType = {
    isLoggedIn: isLogged,
    setIsLoggedIn: setIsLogged,
    selected: selected,
    setSelected: setSelected,
    collapsed,
    setCollapsed: setCollapsed,
    toggleSidebar,
    guests,
    setGuests
  }

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  )
}


export const useMainContext = () => {
  const context = React.useContext(MainContext)
  if (context === undefined) {
    throw new Error('useMainContext must be used within a MainProvider')
  }
  return context
}

export default MainContext