import React from 'react'
import Testimonial from '../components/Testimonial'
import Hero from '../components/Hero'
import AdSection from '../components/AdSection'
import FeaturedProduct from '../components/FeaturedProduct'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProduct />
      <Testimonial />
      <AdSection />
    </>
  )
}
