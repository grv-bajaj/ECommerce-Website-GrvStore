import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Flip } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message.jsx";
import ProgressSteps from "../../components/ProgressSteps.jsx";
import Loader from "../../components/Loader.jsx";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice.js";
import { clearCartItems } from "../../redux/features/cart/cartSlice.js";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />
      <div className="container mx-auto mt-8 ml-20">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty, Go to <Link className="underline" to="/shop">Shop</Link></Message>
        ) : (
          <div className="overflow-x-auto mt-[3rem] border border-gray-600 bg-[#1A1A1A] rounded-xl">
            <table className="w-full border-collapse">
              <thead className="font-semibold border-b border-gray-600">
                <tr>
                  <td className="px-3 py-2 text-left align-top">Image</td>
                  <td className="px-3 py-2 text-left">Product</td>
                  <td className="px-3 py-2 text-left">Quantity</td>
                  <td className="px-3 py-2 text-left">Price</td>
                  <td className="px-3 py-2 text-left">Total</td>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>

                    <td className="px-3 py-2">
                      {item.name}
                    </td>
                    <td className="px-3 py-2">{item.qty}</td>
                    <td className="px-3 py-2">₹ {item.price.toFixed(2)}</td>
                    <td className="px-3 py-2">
                      ₹ {(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold italic mb-5">ORDER <span className="text-lime-300">SUMMARY</span></h2>
          <div className="flex justify-between flex-wrap p-8 bg-[#181818] rounded-xl">
            <ul className="text-lg">
              <h2 className="text-2xl font-semibold mb-4">Total Amount  <span className="text-blue-400">to be Paid</span></h2>

              <li>
                <span className="font-bold mb-4 italic">Items:</span> ₹ 
                {cart.itemsPrice}
              </li>
              <li>
                <span className="font-bold mb-4 italic">Shipping:</span> ₹
                {cart.shippingPrice} <span className="font-light">( Free Shipping if amount is above ₹100 )</span>
              </li>
              <li>
                <span className="font-bold mb-4 italic">Tax:</span> ₹
                {cart.taxPrice} <span className="font-light">( 15% G.S.T included )</span>
              </li>
              <li>
                <span className="font-bold mb-4 italic">Total:</span> ₹
                {cart.totalPrice}
              </li>
            </ul>

            {error && <Message variant="danger">{error.data.message}</Message>}

            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping <span className="text-red-600">Details</span></h2>
              <p>
                <strong className="italic">Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment <span className="text-emerald-400">Method</span></h2>
              <strong className="italic">Method:</strong> {cart.paymentMethod}
            </div>
          </div>

          <button
            type="button"
            className="bg-blue-400 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300 text-white py-2 px-4 rounded-full text-lg ml-[9rem] w-[70rem] mt-4 mb-5 transition-all duration-200"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;