import React from 'react'
import Testimonial from '../components/Testimonial'
import Hero from '../components/Hero'
import AdSection from '../components/AdSection'
import FeaturedProduct from '../components/FeaturedProduct'
import Loading from '../components/Loading'
// import { Hero, FeaturedProduct, AdSection, Testimonial } from '../components'

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
