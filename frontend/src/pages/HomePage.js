import React from 'react'
import Testimonial from '../components/Testimonial'
import Hero from '../components/Hero'
import AdSection from '../components/AdSection'
import FeaturedProduct from '../components/FeaturedProduct'
import BannerSection from '../components/BannerSection'
import BrandSection from '../components/BrandSection'
import Contact from '../components/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BannerSection />
      <FeaturedProduct />
      <Testimonial />
      <Contact />
      <BrandSection />
      <AdSection />
    </>
  )
}
