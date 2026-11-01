import { useState } from "react";
import { Link } from "react-router-dom";

const Card = () => {
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart") || '[]'));

  // Quantity change
  const updateQuantity = (id, color, size, type) => {
    const updatedCart = cartItems.map((item) => {
      if (
        item.id === id &&
        item.color === color &&
        item.size === size
      ) {
        let newQuantity = item.quantity;

        if (type === "increase") {
          newQuantity++;
        }

        if (type === "decrease" && newQuantity > 1) {
          newQuantity--;
        }

        return {
          ...item,
          quantity: newQuantity,
        };
      }

      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove product
  const removeItem = (id, color, size) => {
    const updatedCart = cartItems.filter(
      (item) =>
        !(
          item.id === id &&
          item.color === color &&
          item.size === size
        )
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Discount 20%
  const discount = Math.round(subtotal * 0.2);

  // Delivery
  const deliveryFee = cartItems.length > 0 ? 15 : 0;

  // Final total
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-black">
          Home
        </Link>

        <span className="mx-2">›</span>

        <span className="text-black">
          Cart
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-extrabold mb-6">
        YOUR CART
      </h1>

      {cartItems.length === 0 ? (
        <div className="border rounded-2xl p-12 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mb-6">
            Add some products to your cart first.
          </p>

          <Link
            to="/category"
            className="inline-block bg-black text-white px-8 py-3 rounded-full"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* LEFT - CART PRODUCTS */}
          <div className="lg:col-span-3 border rounded-2xl p-4">

            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.color}-${item.size}`}
                className={`flex items-center gap-4 py-3 ${
                  index !== cartItems.length - 1
                    ? "border-b"
                    : ""
                }`}
              >

                {/* Image */}
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">

                  <h3 className="font-semibold text-base">
                    {item.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Size: {item.size}
                  </p>

                  <p className="text-xs text-gray-500">
                    Color: {item.color}
                  </p>

                  <p className="font-bold text-lg mt-2">
                    ${item.price}
                  </p>

                </div>

                {/* Right Side */}
                <div className="flex flex-col items-end justify-between gap-5">

                  {/* Delete */}
                  <button
                    onClick={() =>
                      removeItem(
                        item.id,
                        item.color,
                        item.size
                      )
                    }
                    className="text-red-500 hover:text-red-700 text-lg"
                  >
                    🗑️
                  </button>

                  {/* Quantity */}
                  <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.color,
                          item.size,
                          "decrease"
                        )
                      }
                      className="w-7 h-7 font-bold"
                    >
                      −
                    </button>

                    <span className="w-7 text-center text-sm">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.color,
                          item.size,
                          "increase"
                        )
                      }
                      className="w-7 h-7 font-bold"
                    >
                      +
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* RIGHT - ORDER SUMMARY */}
          <div className="lg:col-span-2 border rounded-2xl p-5 h-fit">

            <h2 className="text-xl font-bold mb-5">
              Order Summary
            </h2>

            {/* Subtotal */}
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-500">
                Subtotal
              </span>

              <span className="font-semibold">
                ${subtotal}
              </span>
            </div>

            {/* Discount */}
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-500">
                Discount (-20%)
              </span>

              <span className="text-red-500 font-semibold">
                -${discount}
              </span>
            </div>

            {/* Delivery */}
            <div className="flex justify-between text-sm mb-5">
              <span className="text-gray-500">
                Delivery Fee
              </span>

              <span className="font-semibold">
                ${deliveryFee}
              </span>
            </div>

            <div className="border-t pt-4 flex justify-between">
              <span className="text-sm">
                Total
              </span>

              <span className="text-xl font-bold">
                ${total}
              </span>
            </div>

            {/* Promo Code */}
            <div className="flex gap-2 mt-5">

              <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm text-gray-400">
                🏷 Add promo code
              </div>

              <button className="bg-black text-white px-6 rounded-full text-sm">
                Apply
              </button>

            </div>

            {/* Checkout */}
            <Link
              to="/checkout"
              className="mt-4 bg-black text-white rounded-full py-3 flex items-center justify-center gap-2 hover:bg-gray-800"
            >
              Go to Checkout
              <span>→</span>
            </Link>

          </div>
        </div>
      )}
    </div>
  );
};

export default Card;