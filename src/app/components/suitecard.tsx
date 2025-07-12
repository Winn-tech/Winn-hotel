import { Users } from 'lucide-react';
import { Room } from '../types';
import Link from 'next/link';
import Image from 'next/image';

const Suitecard = ({description, id, title, room_image, price, max_guests }: Room) => {
    const roomImage = room_image.split(',')
    const image = roomImage[0]
  return (
    <div
            className="relative border border-primary-100 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            
          >
            <div className="relative w-full h-48">
              <Image
                src={image}
                alt={title}
                className=" object-cover rounded-md mb-4 "
                fill
                
              />
              <span className="absolute top-2 right-2 bg-accent-600 text-white text-sm px-3 py-1 rounded-md shadow">
                ${price}/night
              </span>
            </div>
            <h2 className="text-xl font-semibold text-primary-800 mt-2">{title}</h2>
            <p className="text-sm text-primary-600 mt-1 mb-2">{description}</p>
            <p className="text-sm text-primary-700 flex items-center gap-1">
              <Users className="w-4 h-4" /> Max guests: {max_guests}
            </p>
            <Link href={`/suites/${id}`} className="block">
              <button className="mt-4 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded">
             Details & reservation &rarr;
            </button>
            </Link>
          </div>
  )
}

export default Suitecard