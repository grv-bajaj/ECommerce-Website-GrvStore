import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <h1 className="text-3xl font-bold ml-[12.5rem] mt-[1.5rem]">
        SHOPPING <span className="text-blue-400">CART</span>
      </h1>
      <div className="container flex justify-around items-start wrap mx-auto mt-5">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty, <Link className="hover:border-b text-blue-400" to="/shop">Go to Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%] ">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-enter mb-[1rem] pb-2 border border-gray-600 bg-[#1A1A1A] rounded-xl px-4 py-3">
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 ml-4 ">
                    <Link to={`/product/${item._id}`} className="text-blue-400 font-bold text-lg hover:underline">
                      {item.name}
                    </Link>

                    <div className=" text-white">{item.brand}</div>
                    <div className="mt-2 text-white font-bold">
                      ₹ {item.price}
                    </div>
                  </div>

                  <div className="w-24">
                    <select
                      className="w-[5rem] p-1.5 border border-gray-400 rounded-lg text-white "
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1} className="bg-black">
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="hover:text-red-800 text-pink-600 mr-[5rem]"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaRegTrashAlt className="ml-[1rem] mt-[.5rem] hover:drop-shadow-[0_0_5px_rgba(185,28,28,1)] transition-all duration-200 text-xl" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-3 w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div className="text-2xl font-semibold">
                    Total Amount: ₹{" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>

                  <button
                    className= "mt-4 py-2 px-17 cursor-pointer rounded-xl text-lg font-semibold text-white  transition-all duration-200 bg-blue-400 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;