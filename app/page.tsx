import Header from '@/components/header'
import Hero from '@/components/hero'
import Highlights from '@/components/cta'
import About from '@/components/about'
import Products from '@/components/products'
import Contact from '@/components/contact'
import Footer from '@/components/footer'
import BackToTop from '@/components/back-to-top'

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-[var(--color-offwhite)] pt-[72px] sm:pt-[88px] lg:pt-[96px]">
      <Header />
      <Hero />
      <Highlights />
      <Products />
      <About />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  )
}
