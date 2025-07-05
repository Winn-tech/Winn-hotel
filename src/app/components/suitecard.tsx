import { Users } from 'lucide-react';
import { Room } from '../types';
import Link from 'next/link';
// interface suiteProps {
//     description : st
// }
const Suitecard = ({description, id, title, room_image, price, max_guests }: Room) => {
    const roomImage = room_image.split(',')
    const image = roomImage[0]
  return (
    <div
            className="relative border border-primary-100 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            
          >
            <div className="relative">
              <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <span className="absolute top-2 right-2 bg-accent-600 text-white text-sm px-3 py-1 rounded-md shadow">
                ${price}/night
              </span>
            </div>
            <h2 className="text-xl font-semibold text-primary-800">{title}</h2>
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