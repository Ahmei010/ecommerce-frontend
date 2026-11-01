import MiniNavbar from '../components/home/MiniNavbar'
import Navbar from '../components/Navbar'
import FilterCategory from '../components/category/FilterCategory'
import Footer from '../components/Footer'

const Category = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* Top Mini Navbar */}
      <MiniNavbar />

      {/* Main Navbar */}
      <Navbar />

      {/* Category Section */}
      <main className="w-full">
        <FilterCategory />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Category