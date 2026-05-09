import Header from '@/components/header'
import Hero from '@/components/hero'
import Stats from '@/components/stats'
import About from '@/components/about'
import MissionVision from '@/components/mission-vision'
import Products from '@/components/products'
import CTA from '@/components/cta'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      <Hero />
      <Stats />
      <About />
      <MissionVision />
      <Products />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}
