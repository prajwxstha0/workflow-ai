import FAQ from "../components/landing/FAQ"
import Features from "../components/landing/Features"
import Hero from "../components/landing/Hero"
import HowItWorks from "../components/landing/HowItWorks"
import Navbar from "../components/landing/Navbar"
import Pricing from "../components/landing/Pricing"


const Landing = () => {
  return (
    <div>
      <Navbar  />
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <FAQ />
    </div>
  )
}

export default Landing