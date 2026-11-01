import { Link } from "react-router-dom";

const MiniNavbar = () => {
  return (
    <div className="w-full bg-black text-white">
      <div className="relative flex min-h-[38px] w-full items-center justify-center px-10 sm:px-12">
        
        {/* Offer Text */}
        <p className="text-center text-[9px] sm:text-[10px] md:text-xs font-normal">
          Sign up and get 20% off your first order.{" "}
          <Link
            to="/register"
            className="underline underline-offset-2 hover:text-gray-300 transition"
          >
            Sign Up Now
          </Link>
        </p>

        {/* Close Button */}
        <button
          type="button"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2
                     text-lg sm:text-xl leading-none
                     hover:text-gray-400 transition"
          aria-label="Close"
        >
          ×
        </button>

      </div>
    </div>
  );
};

export default MiniNavbar;