"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Link from "next/link"
import { ChevronDown, Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react"
import { RefObject } from "react"

export default function RestaurantHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const featuredRef = useRef(null)
  const reservationRef = useRef(null)
  const isFeaturedInView = useInView(featuredRef, { margin: '-50% 0px' })
  const isReservationInView = useInView(reservationRef, { margin: '-50% 0px' })

  const featuredDishes = [
    { name: "Grilled Salmon", price: "$24", image: "/1.jpg" },
    { name: "Beef Tenderloin", price: "$28", image: "/2.jpg" },
    { name: "Vegetarian Pasta", price: "$18", image: "/3.jpg" },
    { name: "Chicken Alfredo", price: "$22", image: "/4.jpg" },
    { name: "Lobster Bisque", price: "$30", image: "/5.jpg" },
    { name: "Caesar Salad", price: "$15", image: "/6.jpg" },
  ]

  const smoothScrollTo = (ref: RefObject<HTMLElement>, duration: number) => {
    const targetPosition = ref.current?.getBoundingClientRect().top || 0;
    const startPosition = window.pageYOffset;
    const distance = targetPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited && videoRef.current) {
      videoRef.current.muted = false;
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  function handleReservationSubmit(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const reservationData = {
      name: formData.get('name'),
      email: formData.get('email'),
      date: formData.get('date'),
      time: formData.get('time'),
      guests: formData.get('guests'),
    };

    console.log('Reservation Data:', reservationData); // Debugging line

    // Remove server interaction
    // fetch('http://localhost:3001/api/reservations', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(reservationData),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Reservation successful:', data);
    //     // Optionally, show a success message to the user
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //     // Optionally, show an error message to the user
    //   });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="relative h-screen overflow-hidden">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          playsInline
          muted
          className="absolute w-full h-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <nav className="relative z-10">
            <div className="container mx-auto flex items-center justify-between p-4">
              <a href="#" className="text-2xl font-bold text-white">
                Gourmet Haven
              </a>
              <button
                className="text-white focus:outline-none md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
              <ul className={`absolute inset-x-0 top-full bg-black bg-opacity-50 p-4 md:relative md:flex md:bg-transparent md:p-0 ${isMenuOpen ? 'block' : 'hidden'}`}>
                <li className="mb-2 md:mb-0 md:mr-6">
                  <a href="#" className="text-white hover:text-gray-300">
                    Home
                  </a>
                </li>
                <li className="mb-2 md:mb-0 md:mr-6">
                  <Link href="/categories" className="text-white hover:text-gray-300">
                    Menu
                  </Link>
                </li>
                <li className="mb-2 md:mb-0 md:mr-6">
                  <a href="#reservation" className="text-white hover:text-gray-300">
                    Reservation
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-white hover:text-gray-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ bottom: '7%' }}>
            <div className="text-center mb-8">
              <motion.h1
                className="mb-4 text-5xl font-bold text-white md:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Welcome to Gourmet Haven
              </motion.h1>
              <motion.p
                className="mb-8 text-xl text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Experience culinary excellence in every bite
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6"
            >
              <Button
                size="lg"
                className="bg-black text-white px-6 py-3 transition-all duration-500 ease-in-out transform hover:scale-110 hover:bg-gray-700 hover:shadow-2xl"
                onClick={() => smoothScrollTo(reservationRef, 1000)} // Set duration to 1000ms
                asChild
              >
                <Link href="#reservation" className="flex items-center space-x-2">
                  <span>Make a Reservation</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 ease-in-out transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white cursor-pointer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, repeat: Infinity, repeatType: "reverse" }}
            onClick={() => smoothScrollTo(featuredRef, 1000)} // Use smoothScrollTo for ChevronDown
          >
            <ChevronDown className="h-12 w-12 text-white hover:text-gray-300 hover:shadow-lg transition-all duration-300 ease-in-out" />
          </motion.div>
        </div>
      </header>

      <main>
        <section id="menu" className="py-16 text-black" ref={featuredRef}>
          <div className="container mx-auto px-4">
            <motion.h2
              className="mb-12 text-center text-3xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={isFeaturedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
            >
              Featured Dishes
            </motion.h2>
            <div className="grid gap-8 md:grid-cols-3">
              {featuredDishes.map((dish, index) => (
                <motion.div
                  key={dish.name}
                  className="overflow-hidden rounded-lg bg-white shadow-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isFeaturedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <img src={dish.image} alt={dish.name} className="h-[275px] w-full object-cover" />
                  <div className="p-4">
                    <h3 className="mb-2 text-xl font-semibold">{dish.name}</h3>
                    <p className="text-gray-600">{dish.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="reservation" className="bg-gray-100 text-black py-16" ref={reservationRef}>
          <div className="container mx-auto px-4">
            <motion.h2
              className="mb-12 text-center text-3xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={isReservationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
            >
              Make a Reservation
            </motion.h2>
            <motion.form
              onSubmit={handleReservationSubmit}
              className="mx-auto max-w-md space-y-4"
              initial={{ opacity: 0, y: 50 }}
              animate={isReservationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" placeholder="Your Name" className="bg-gray-300" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="your@email.com" className="bg-gray-300" required />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" className="bg-gray-300" required />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" name="time" type="time" className="bg-gray-300" required />
              </div>
              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Input id="guests" name="guests" type="number" min="1" max="10" className="bg-gray-300" required />
              </div>
              <Button type="submit" className="w-full bg-black text-white px-6 py-3 rounded-full transition-all duration-500 ease-in-out transform hover:scale-110 hover:bg-gray-700 hover:shadow-2xl">
                Reserve Table
              </Button>
            </motion.form>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-gray-800 py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xl font-semibold">Contact Us</h3>
              <p className="flex items-center"><MapPin className="mr-2 h-5 w-5" /> 123 Gourmet Street</p>
              <p className="ml-7">Foodville, FD 12345</p>
              <p className="flex items-center"><Phone className="mr-2 h-5 w-5" /> (123) 456-7890</p>
              <p className="flex items-center"><Mail className="mr-2 h-5 w-5" /> info@gourmethaven.com</p>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold">Opening Hours</h3>
              <p className="flex items-center"><Clock className="mr-2 h-5 w-5" /> Monday - Friday: 11:00 AM - 10:00 PM</p>
              <p className="flex items-center"><Clock className="mr-2 h-5 w-5" /> Saturday - Sunday: 10:00 AM - 11:00 PM</p>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-600 text-white">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-gray-600 text-white">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-gray-600 text-white">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 Gourmet Haven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
