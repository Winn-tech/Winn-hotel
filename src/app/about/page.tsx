import Image from 'next/image';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "About",
}
export default function AboutPage() {
    const mainImage = 'https://ftdxflkcjyiawkvbdgmx.supabase.co/storage/v1/object/public/rooms//visualsofdana-T5pL6ciEn-I-unsplash.jpg'
    const imageOne = 'https://ftdxflkcjyiawkvbdgmx.supabase.co/storage/v1/object/public/rooms//workdesk.jpg'
    const imageTwo = 'https://ftdxflkcjyiawkvbdgmx.supabase.co/storage/v1/object/sign/logo/ChatGPT%20Image%20Jun%206,%202025,%2001_22_58%20PM.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZjMwYTVlMS1kMzNlLTQzZDQtYjkyNS0xYmE3MzcxZGE5ZjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvL0NoYXRHUFQgSW1hZ2UgSnVuIDYsIDIwMjUsIDAxXzIyXzU4IFBNLnBuZyIsImlhdCI6MTc1MTY4NzY4OSwiZXhwIjoxODM4MDg3Njg5fQ.KmkmOhnLAZo71UIpgNFZv68Dg3lQb1z6X3PMMgr889Q'
  return (

    <main className="min-h-screen bg-white text-gray-800">
     
       <div className="relative text-center py-4 px-4 sm:py-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-800">Winn Hotel</h1>
          <p className="mt-2 text-base sm:text-lg md:text-xl text-accent-500">Luxury, Comfort & Exceptional Service</p>
      </div>

     <div className="px-4 sm:px-6 lg:px-8">
       <div className="sm:grid grid-cols-3 gap-2 sm:gap-4 py-4 rounded-xl block overflow-hidden">
        <div className="col-span-2 row-span-2 rounded-xl overflow-hidden relative h-[30vh] xs:h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[75vh]">
          <Image 
            src={mainImage} 
            alt="Room 1" 
            fill
            className="rounded-xl object-cover"
            // priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 66vw, (max-width: 1024px) 60vw, 50vw"
          />
        </div>
        <div className="rounded-xl overflow-hidden hidden sm:block relative h-[24vh] md:h-[29vh] lg:h-[34vh] xl:h-[36vh]">
          <Image 
            src={imageOne} 
            alt="Room 2" 
            fill
            className="rounded-xl object-cover"
            sizes="(max-width: 640px) 0vw, (max-width: 768px) 33vw, (max-width: 1024px) 30vw, 25vw"
          />
        </div>
        <div className="rounded-xl overflow-hidden hidden sm:block relative h-[24vh] md:h-[29vh] lg:h-[34vh] xl:h-[36vh]">
          <Image 
            src={imageTwo} 
            alt="Bathroom" 
            fill
            className="rounded-xl object-cover"
            sizes="(max-width: 640px) 0vw, (max-width: 768px) 33vw, (max-width: 1024px) 30vw, 25vw"
          />
        </div>
      </div>
     </div>

      
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4 md:mb-6">Experience Timeless Elegance</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
              Welcome to Winn Hotel, where luxury meets tranquility. Nestled in the heart
              of Lagos, we offer world-class amenities, beautiful interior spaces, and personalized
              services to make your stay unforgettable.
            </p>
            <p className="text-gray-600 mt-3 sm:mt-4 md:mt-6 leading-relaxed text-sm sm:text-base md:text-lg">
              Whether you&apos;re visiting for business or leisure, our team ensures a seamless
              experience from check-in to check-out. With premium rooms, fine dining, and spa
              services, we redefine hospitality.
            </p>
          </div>
          <div className="order-1 md:order-2 relative aspect-[4/3] sm:aspect-[3/2] md:aspect-[4/3]">
            <Image
              src="https://ftdxflkcjyiawkvbdgmx.supabase.co/storage/v1/object/public/rooms//standard-01.jpg"
              alt="Hotel Room"
              fill
              className="rounded-xl sm:rounded-2xl shadow-lg object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 45vw, 40vw"
            />
          </div>
        </div>
      </section>

      {/* Values / Mission */}
      <section className="bg-gray-100 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 md:mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Excellence</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                We strive for the highest standards in every detail of our services.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Comfort</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Our rooms and amenities are designed to make you feel at home.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sm:col-span-2 lg:col-span-1">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Hospitality</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                We treat our guests with warmth, respect, and genuine care.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}