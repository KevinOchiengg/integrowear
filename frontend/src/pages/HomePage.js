import React from 'react'
import Testimonial from '../components/Testimonial'
import Hero from '../components/Hero'
import AdSection from '../components/AdSection'
import FeaturedProduct from '../components/FeaturedProduct'
import BannerSection from '../components/BannerSection'
import BrandSection from '../components/BrandSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BannerSection />
      <FeaturedProduct />
      <Testimonial />
      <AdSection />
      <BrandSection />
    </>
  )
}
