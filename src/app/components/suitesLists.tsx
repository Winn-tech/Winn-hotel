import React from 'react'
import { getRooms } from '../_lib/services'
import Suitecard from './suitecard'
import { Room } from '../types'

interface SuitesListsProps {
  filter: string | string[]
}
const SuitesLists = async ({filter}: SuitesListsProps) => {
   const suites = await getRooms()
   let filteredSuites:Room[] = [];
   if (filter === 'all') {
    filteredSuites = suites; // Direct assignment is more efficient
  } else {
    filteredSuites = suites.filter((suite) => suite.room_type === filter);
  }
    
  console.log('Filtered Suites:', filteredSuites);
  return (
    <> 
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5'>
        {
          filteredSuites.map((suite)=>{
            return (
              <Suitecard {...suite} key={suite.id}/>
            )
          })
        }
    </div>
    </>
  )
}

export default SuitesLists

























