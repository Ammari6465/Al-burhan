import Header from '@/components/header'
import Hero from '@/components/hero'
import Stats from '@/components/stats'
import About from '@/components/about'
import Products from '@/components/products'
import CTA from '@/components/cta'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-white pt-[72px]">
      <Header />
      <Hero />
      <Stats />
      <Products />
      <CTA />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
