import zara from "../../assets/zara.png";
import calvin from "../../assets/calvin.png";
import prada from "../../assets/prada.png";
import gucci from "../../assets/gucci.png";
import versace from "../../assets/versace.png";

const Banner = () => {
  const brands = [
    { name: "Versace", image: versace },
    { name: "Zara", image: zara },
    { name: "Gucci", image: gucci },
    { name: "Prada", image: prada },
    { name: "Calvin Klein", image: calvin },
  ];

  return (
    <section className="w-full bg-black px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 xl:px-10">
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-7xl
          grid-cols-3
          items-center
          justify-items-center
          gap-x-4
          gap-y-6
          px-2
          py-3

          xs:grid-cols-4
          xs:gap-x-5
          xs:px-3

          sm:grid-cols-5
          sm:gap-x-6
          sm:gap-y-7
          sm:px-4
          sm:py-4

          md:grid-cols-5
          md:gap-8
          md:px-6
          md:py-5

          lg:gap-10
          lg:px-8

          xl:gap-12
          xl:px-10
        "
      >
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="
              flex
              items-center
              justify-center
              w-full
              col-span-1
            "
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="
                block
                h-auto
                w-auto
                max-w-[70px]
                max-h-6
                object-contain
                transition-transform
                duration-300
                hover:scale-105

                xs:max-w-[80px]
                xs:max-h-7

                sm:max-w-[95px]
                sm:max-h-8

                md:max-w-[110px]
                md:max-h-9

                lg:max-w-[130px]
                lg:max-h-10

                xl:max-w-[150px]
                xl:max-h-11

                2xl:max-w-[160px]
                2xl:max-h-12
              "
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;