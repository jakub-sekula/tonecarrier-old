export const metadata = {
  title: 'Home - Simple',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import FeaturesBlocks from '@/components/features-blocks'
import Testimonials from '@/components/testimonials'
import Newsletter from '@/components/newsletter'
import Faq from '@/components/faq'
import Gallery from '@/components/gallery'

export default function Home() {
  return (
    <>
      <Hero />
      {/* <FeaturesBlocks /> */}
      <Gallery />
      {/* <Features /> */}
      <Testimonials />
      {/* <Newsletter /> */}
      {/* <Faq /> */}
    </>
  )
}
