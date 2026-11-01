import frameOne from '../../assets/FrameImage.png'
import frametwo from '../../assets/FrameImageo.png'
import framethree from '../../assets/Frameimaget.png'
import framefour from '../../assets/Frameimagetwo.png'

const Frame = () => {
  return (
    <div className="bg-[#F0F0F0] rounded-[40px] px-6 py-10 sm:p-16 max-w-6xl mx-auto my-8">
      {/* Heading */}
      <h2 className="text-3xl sm:text-5xl font-extrabold text-center text-black mb-8 sm:mb-14 uppercase tracking-tight">
        Browse By Dress Style
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Casual - 1 Column */}
        <div className="relative bg-white rounded-[20px] overflow-hidden h-[280px] md:col-span-1 cursor-pointer">
          <span className="absolute top-6 left-6 text-2xl font-bold text-black z-10">
        
          </span>
          <img 
            src={frameOne} 
            alt="Casual" 
            className="w-full h-full object-cover object-right-top"
          />
        </div>

        {/* Formal - 2 Columns */}
        <div className="relative bg-white rounded-[20px] overflow-hidden h-[280px] md:col-span-2 cursor-pointer">
          <span className="absolute top-6 left-6 text-2xl font-bold text-black z-10">
           
          </span>
          <img 
            src={framefour} 
            alt="Formal" 
            className="w-full h-full object-cover object-right"
          />
        </div>

        {/* Party - 2 Columns */}
        <div className="relative bg-white rounded-[20px] overflow-hidden h-[280px] md:col-span-2 cursor-pointer">
          <span className="absolute top-6 left-6 text-2xl font-bold text-black z-10">
            
          </span>
          <img 
            src={framethree} 
            alt="Party" 
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Gym - 1 Column */}
        <div className="relative bg-white rounded-[20px] overflow-hidden h-[280px] md:col-span-1 cursor-pointer">
          <span className="absolute top-6 left-6 text-2xl font-bold text-black z-10">
         
          </span>
          <img 
            src={frametwo} 
            alt="Gym" 
            className="w-full h-full object-cover object-right-top"
          />
        </div>

      </div>
    </div>
  )
}

export default Frame