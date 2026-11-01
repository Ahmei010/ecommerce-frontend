import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';

const NewArrival = ({ title = 'NEW ARRIVALS' }) => {
  const sort = title.toLowerCase().includes('sell') ? 'priceDesc' : 'newest';

  return (
    <section>
      <ProductGrid title={title} query={sort} limit={4} />
      <div className="-mt-2 mb-6 flex justify-center">
        <Link to="/category" className="rounded-full border border-gray-300 px-8 py-2.5 text-sm font-medium text-gray-700 transition hover:border-black hover:bg-black hover:text-white">
          View all products
        </Link>
      </div>
    </section>
  );
};

export default NewArrival;
