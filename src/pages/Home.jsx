import MiniNavbar from '../components/home/MiniNavbar'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Banner from '../components/home/Banner'
import NewArrival from '../components/NewArrival'
import Frame from '../components/home/Frame'
import Testimonials from '../components/home/Testimonials'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div>
      <MiniNavbar />
      <Navbar />
      <HeroSection />
      <Banner />
      <NewArrival title="NEW ARRIVALS" />
      <NewArrival title="TOP SELL" />
      <Frame />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home
