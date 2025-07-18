import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast, Flip } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
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
  };

  return (
    <div className="max-w-sm relative bg-[#1A1A1A] rounded-xl shadow border border-gray-600">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-2 right-1 bg-blue-400 text-sm font-medium mr-2 px-2.5 py-1 rounded-full">
            {p?.brand}
          </span>
          <img
            className="cursor-pointer w-full rounded-t-xl"
            src={p.image}
            alt={p.name}
            style={{ height: "240px", width: "360px", objectFit: "cover" }}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl font-bold">{p?.name}</h5>
          <p className="ml-1 text-md font-semibold text-gray-200">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>

        <p className="mb-3 font-normal text-[#CFCFCF]">
          {p?.description?.substring(0, 120)} ...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          <button
            className="p-2 rounded-full cursor-pointer text-lime-300 hover:text-lime-600"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;