import Detail from '../components/Detail'
import MiniNavbar from '../components/home/MiniNavbar'
import Navbar from '../components/Navbar'
import NewArrival from '../components/NewArrival'
import Footer from '../components/Footer'
import Review from '../components/Review'



const ProductDetail = () => {
  return (
    <div>
      <MiniNavbar />
      <Navbar />
      <Detail />
      <Review />
      <NewArrival title='YOU MIGHT ALSO LIKE' />
      <Footer />
      
    </div>
  )
}

export default ProductDetail
