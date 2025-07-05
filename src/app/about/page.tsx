import Image from 'next/image';

export default function AboutPage() {
    const mainImage = 'https://ftdxflkcjyiawkvbdgmx.supabase.co/storage/v1/object/public/rooms//visualsofdana-T5pL6ciEn-I-unsplash.jpg'
    const imageOne = 'https://ftdxflkcjyiawkvbdgmx.supabase.co/storage/v1/object/public/rooms//workdesk.jpg'
    const imageTwo = 'https://ftdxflkcjyiawkvbdgmx.supabase.co/storage/v1/object/sign/logo/ChatGPT%20Image%20Jun%206,%202025,%2001_22_58%20PM.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZjMwYTVlMS1kMzNlLTQzZDQtYjkyNS0xYmE3MzcxZGE5ZjMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvL0NoYXRHUFQgSW1hZ2UgSnVuIDYsIDIwMjUsIDAxXzIyXzU4IFBNLnBuZyIsImlhdCI6MTc1MTY4NzY4OSwiZXhwIjoxODM4MDg3Njg5fQ.KmkmOhnLAZo71UIpgNFZv68Dg3lQb1z6X3PMMgr889Q'
  return (

    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
       <div className="relative text-center py-3">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-800">Winn Hotel</h1>
          <p className="mt-2 text-lg text-accent-500">Luxury, Comfort & Exceptional Service</p>
      </div>

     <div className="sm:grid grid-cols-3 gap-4 py-4 rounded-xl block overflow-hidden ">
        <img src={mainImage} alt="Room 1" className="col-span-2 row-span-2 rounded-xl object-cover w-full h-[45vh] sm:h-[70vh]" />
        <img src={imageOne} alt="Room 2" className="rounded-xl w-full h-[33vh] object-cover hidden sm:block" />
        <img src={imageTwo} alt="Bathroom" className="rounded-xl w-full h-[33vh] object-cover hidden sm:block" />
      </div>

      {/* About Content */}
      <section className=" py-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Experience Timeless Elegance</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to Winn Hotel, where luxury meets tranquility. Nestled in the heart
              of Lagos, we offer world-class amenities, beautiful interior spaces, and personalized
              services to make your stay unforgettable.
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Whether you're visiting for business or leisure, our team ensures a seamless
              experience from check-in to check-out. With premium rooms, fine dining, and spa
              services, we redefine hospitality.
            </p>
          </div>
          <div>
            <Image
              src="https://ftdxflkcjyiawkvbdgmx.supabase.co/storage/v1/object/public/rooms//standard-01.jpg"
              alt="Hotel Room"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Values / Mission */}
      <section className="bg-gray-100 py-16 ">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Excellence</h4>
              <p className="text-sm text-gray-600">
                We strive for the highest standards in every detail of our services.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Comfort</h4>
              <p className="text-sm text-gray-600">
                Our rooms and amenities are designed to make you feel at home.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Hospitality</h4>
              <p className="text-sm text-gray-600">
                We treat our guests with warmth, respect, and genuine care.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
