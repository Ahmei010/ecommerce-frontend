import pay from '../assets/Badge.png';
import payThree from '../assets/BadgeThree.png';
import payTwo from '../assets/BadgeTwo.png';
import payOne from '../assets/BadgeOne.png';
import twitter from '../assets/twitter.png';
import instagram from '../assets/instagram.png';
import github from '../assets/github.png';
import facebook from '../assets/Group.png';
import Vector from '../assets/Vector.png';

const Footer = () => {
  return (
    <footer className="bg-white mt-16">
      {/* Newsletter Section - Top of Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-6 relative z-10">
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row justify-between items-center gap-6 shadow-xl">
          <div className="text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              STAY UPTODATE ABOUT
            </h2>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              OUR LATEST OFFERS
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-4 sm:px-6 py-3 rounded-full w-full sm:w-56 md:w-64 lg:w-72 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-700 bg-white/95 backdrop-blur text-sm sm:text-base"
            />
            <button className="bg-white text-black px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-200 shadow-lg whitespace-nowrap text-sm sm:text-base">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gray-50 pt-16 sm:pt-20 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-6">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-black p-2 rounded-lg">
                  <img src={Vector} alt="Shop.co Logo" className="w-5 h-5 sm:w-6 sm:h-6 filter brightness-0 invert" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-black">SHOP.CO</h2>
              </div>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                We have clothes that suits your style and which you're proud to wear. From women to men.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black text-white flex items-center justify-center transition-colors hover:scale-110 transform duration-200">
                  <img src={facebook} alt="Facebook" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
                <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full text-white flex items-center justify-center transition-colors hover:scale-110 transform duration-200">
                  <img src={twitter} alt="Twitter" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
                <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full text-white flex items-center justify-center transition-colors hover:scale-110 transform duration-200">
                  <img src={instagram} alt="Instagram" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
                <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full text-white flex items-center justify-center transition-colors hover:scale-110 transform duration-200">
                  <img src={github} alt="GitHub" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-4">COMPANY</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-black transition text-sm">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition text-sm">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition text-sm">Works</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition text-sm">Career</a></li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-4">HELP</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-black transition text-sm">Customer Support</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition text-sm">Delivery Details</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition text-sm">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition text-sm">Privacy Policy</a></li>
              </ul>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-4">FAQ</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-black transition text-sm">Account</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition text-sm">Manage Deliveries</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition text-sm">Orders</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition text-sm">Payments</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-4">RESOURCES</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-black transition text-sm">Free eBooks</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition text-sm">Development Tutorial</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition text-sm">How to - Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition text-sm">Youtube Playlist</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              Shop.co © 2000-2023, All Rights Reserved
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 items-center justify-center">
              <img src={pay} alt="VISA" className="h-8 sm:h-10 md:h-12 w-auto" />
              <img src={payOne} alt="PayPal" className="h-8 sm:h-10 md:h-12 w-auto" />
              <img src={payTwo} alt="Apple Pay" className="h-8 sm:h-10 md:h-12 w-auto" />
              <img src={payThree} alt="Google Pay" className="h-8 sm:h-10 md:h-12 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;