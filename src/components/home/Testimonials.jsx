import { useRef } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    text: '"I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations."',
  },
  {
    id: 2,
    name: 'Alex K.',
    text: '"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."',
  },
  {
    id: 3,
    name: 'James L.',
    text: '"As someone who\'s always on the lookout for unique fashion pieces, I\'m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."',
  },
  {
    id: 4,
    name: 'Mooen',
    text: '"As someone who\'s always on the lookout for unique fashion pieces, I\'m thrilled to have stumbled upon Shop.co. The selection of clothes is not only divine."',
  },
  {
    id: 5,
    name: 'Samantha D.',
    text: '"The customer service was exceptional, and the delivery was super fast. Highly recommend Shop.co for all fashion lovers!"',
  },
];

const Testimonials = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full px-4 py-8 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 md:mb-10 gap-4">
        <h2 className="text-2xl font-bold uppercase tracking-wide sm:text-3xl md:text-4xl lg:text-5xl text-center sm:text-left">
          Our Happy Customers
        </h2>

        {/* Custom Navigation Arrows */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={scrollLeft}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center text-lg sm:text-xl text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300"
            aria-label="Scroll left"
          >
            &#8592;
          </button>
          <button
            onClick={scrollRight}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center text-lg sm:text-xl text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300"
            aria-label="Scroll right"
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="min-w-[280px] sm:min-w-[300px] md:min-w-[340px] lg:min-w-[360px] xl:min-w-[380px] bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Star Rating */}
            <div className="flex gap-0.5 text-yellow-400 text-base sm:text-lg">
              {[...Array(5)].map((_, index) => (
                <span key={index}>★</span>
              ))}
            </div>

            {/* Name & Verified Badge */}
            <div className="flex items-center gap-2 mt-2 sm:mt-3">
              <h3 className="font-bold text-sm sm:text-base md:text-lg text-black">
                {item.name}
              </h3>
              <span className="bg-green-500 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[8px] sm:text-[10px] font-bold">
                ✓
              </span>
            </div>

            {/* Review Text */}
            <p className="text-gray-600 text-xs sm:text-sm mt-1.5 sm:mt-2 leading-relaxed line-clamp-4">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;