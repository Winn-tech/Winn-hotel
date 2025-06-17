import React, { Suspense } from 'react'
import SuitesLists from '../components/suitesLists'
import Loading from './loading'
import SuitesFilter from '../components/suitesFilter'
import { getRooms } from '../_lib/services';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page = ({searchParams}:PageProps) => {
  const filter = searchParams?.room_class ?? 'all';
  console.log('Filter:', filter);
  
  return (
    <div>
        <h1 className='sm:text-4xl text-2xl my-5 text-primary-950 font-medium'>
        Our luxury cabins
      </h1>
      <p className='text-primary-950 text-lg  my-5'>
        Experience refined comfort in our beautifully designed suites, located in the heart of Lagos, 
        Nigeria. Begin your day with peaceful views of lush surroundings and immerse yourself in the 
        natural beauty of the region. Each suite offers a private sanctuary where luxury meets nature—complete
        with a personal hot tub for soaking under the stars, offering the perfect escape from the everyday.
       </p>
       <SuitesFilter/>
       <Suspense fallback={<Loading/>}>
          <SuitesLists filter={filter} />
       </Suspense>  
    </div>
  )
}

export default Page
