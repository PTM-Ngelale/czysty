import ScrollRevealProvider from '@/components/ScrollRevealProvider'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import Gallery from '@/components/Gallery'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import OrderCTA from '@/components/OrderCTA'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <ScrollRevealProvider>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <HowItWorks />
      <Gallery />
      <Pricing />
      <Testimonials />
      <OrderCTA />
      <Contact />
      <Footer />
    </ScrollRevealProvider>
  )
}
