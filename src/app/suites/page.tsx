import React, { Suspense } from 'react'
import SuitesLists from '../components/suitesLists'
import Loading from './loading'
import SuitesFilter from '../components/suitesFilter'
import Suitesparams from '../components/suitesparams'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Suites",
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({searchParams}:PageProps) => {
  const params = await searchParams;
  const filter = params?.room_class ?? 'all'; 
  return (
    <div>
        <h1 className='sm:text-4xl text-2xl my-5 text-primary-950 font-medium'>
        Our luxury Suites
      </h1>
      <p className='text-primary-950 text-lg  my-5'>
        Experience refined comfort in our beautifully designed suites, located in the heart of Lagos, 
        Nigeria. Begin your day with peaceful views of lush surroundings and immerse yourself in the 
        natural beauty of the region. Each suite offers a private sanctuary where luxury meets nature—complete
        with a personal hot tub for soaking under the stars, offering the perfect escape from the everyday.
       </p>
       <Suitesparams/>
       <SuitesFilter/>
       <Suspense fallback={<Loading/>}>
          <SuitesLists filter={filter} />
       </Suspense>  
    </div>
  )
}

export default Page
