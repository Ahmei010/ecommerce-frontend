import { Link } from 'react-router-dom';
import Vector from "../assets/BVector.png";
import heronav from "../assets/heronav.png";

const HeroSection = () => {
    return (
        <section className="w-full overflow-hidden bg-[#f5f3f3]">
            <div className="relative mx-auto flex w-full max-w-[1600px] flex-col px-4 pt-6 sm:px-6 sm:pt-8 md:px-8 lg:min-h-[470px] lg:flex-row lg:items-center lg:px-10 lg:pt-0 xl:min-h-[500px] xl:px-14 2xl:px-16">
                
                {/* LEFT CONTENT */}
                <div className="relative z-20 w-full lg:w-[52%] xl:w-[50%] 2xl:w-[48%]">
                    {/* Heading */}
                    <h1 className="max-w-[620px] text-[32px] font-black leading-[0.9] tracking-[-1.5px] text-black xs:text-[38px] sm:text-[44px] md:text-[52px] lg:text-[48px] xl:text-[58px] 2xl:text-[68px]">
                        FIND CLOTHES
                        <br />
                        THAT MATCHES
                        <br />
                        YOUR STYLE
                    </h1>

                    {/* Description */}
                    <p className="mt-4 max-w-[500px] text-[10px] leading-relaxed text-gray-500 xs:text-[11px] sm:text-xs md:text-sm lg:text-[13px] xl:text-base">
                        Browse through our diverse range of meticulously crafted garments,
                        designed to bring out your individuality and cater to your sense of
                        style.
                    </p>

                    {/* Shop Now Button */}
                    <Link
                        to="/category"
                        className="mt-5 inline-flex h-[40px] w-full items-center justify-center rounded-full bg-black px-6 text-xs font-medium text-white transition duration-300 hover:scale-105 hover:bg-gray-800 active:scale-95 sm:w-[140px] md:h-[44px] md:text-sm lg:h-[48px] lg:w-[150px] xl:h-[52px] xl:w-[160px]"
                    >
                        Shop Now
                    </Link>

                    {/* Stats Grid */}
                    <div className="mt-6 grid w-full max-w-[550px] grid-cols-2 gap-y-2 sm:grid-cols-3 lg:mt-8 xl:mt-10">
                        {/* 200+ */}
                        <div className="flex flex-col items-center border-r border-gray-300 py-1 sm:items-start sm:pr-4 md:pr-6 lg:pr-8">
                            <h2 className="text-[20px] font-medium leading-none sm:text-[24px] md:text-[28px] lg:text-[30px] xl:text-[34px]">
                                200+
                            </h2>
                            <p className="mt-1 text-[7px] text-gray-500 xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px]">
                                International Brands
                            </p>
                        </div>

                        {/* 2,000+ */}
                        <div className="flex flex-col items-center py-1 sm:items-start sm:border-r sm:border-gray-300 sm:px-3 md:px-4 lg:px-6">
                            <h2 className="text-[20px] font-medium leading-none sm:text-[24px] md:text-[28px] lg:text-[30px] xl:text-[34px]">
                                2,000+
                            </h2>
                            <p className="mt-1 text-[7px] text-gray-500 xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px]">
                                High-Quality Products
                            </p>
                        </div>

                        {/* 30,000+ */}
                        <div className="col-span-2 flex flex-col items-center py-2 sm:col-span-1 sm:items-start sm:py-1 sm:pl-3 md:pl-4 lg:pl-6">
                            <h2 className="text-[20px] font-medium leading-none sm:text-[24px] md:text-[28px] lg:text-[30px] xl:text-[34px]">
                                30,000+
                            </h2>
                            <p className="mt-1 text-[7px] text-gray-500 xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px]">
                                Happy Customers
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT IMAGE SECTION */}
                <div className="relative mt-6 flex w-full justify-center lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:h-full lg:w-[52%] lg:items-end lg:justify-end xl:w-[50%]">
                    
                    {/* Main Image Container */}
                    <div className="relative flex w-full items-center justify-center lg:w-[85%] lg:justify-end xl:w-[80%] 2xl:w-[75%]">
                        <img
                            src={heronav}
                            alt="Fashion models"
                            className="relative z-10 block h-auto w-full max-w-[280px] object-contain xs:max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[480px] xl:max-w-[550px] 2xl:max-w-[650px]"
                        />
                    </div>

                    {/* Top Right Vector */}
                    <img
                        src={Vector}
                        alt=""
                        className="absolute right-[2%] top-[2%] z-20 w-[32px] xs:right-[4%] xs:w-[38px] sm:right-[6%] sm:w-[44px] md:right-[8%] md:w-[50px] lg:right-[5%] lg:top-[8%] lg:w-[60px] xl:right-[8%] xl:top-[10%] xl:w-[72px] 2xl:w-[85px]"
                    />

                    {/* Bottom Left Vector */}
                    <img
                        src={Vector}
                        alt=""
                        className="absolute bottom-[30%] left-[2%] z-20 w-[20px] xs:left-[4%] xs:w-[24px] sm:left-[6%] sm:w-[28px] md:left-[8%] md:w-[32px] lg:bottom-[35%] lg:left-[6%] lg:w-[38px] xl:bottom-[40%] xl:left-[8%] xl:w-[44px] 2xl:w-[52px]"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;