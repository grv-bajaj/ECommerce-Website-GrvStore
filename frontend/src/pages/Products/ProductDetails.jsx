import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, Flip } from "react-toastify";
import { useGetProductDetailsQuery, useCreateReviewMutation } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings.jsx";
import ProductTabs from "./ProductTabs.jsx";
import { addToCart } from "../../redux/features/cart/cartSlice.js";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review created successfully!", {
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
    } catch (error) {
      toast.error(error?.data || error.message, {
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

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <div>
        <Link
          to="/"
          className="text-white text-xl font-semibold hover:border-b ml-[9rem]"
        >
          &lt; Back to HOME <span className="text-green-500">PAGE</span>
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between mt-[1rem] ml-[9rem]">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[39rem] lg:w-[39rem] md:w-[30rem] sm:w-[20rem] mr-[2rem] rounded-xl"
              />

              <HeartIcon product={product} />
            </div>

            <div className="flex flex-col justify-between">
              <h2 className="text-3xl font-semibold">{product.name}</h2>
              <p className="xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0] my-4">
                {product.description}
              </p>
              <p className="text-4xl my-4 font-extrabold">₹ {product.price}</p>

              <div className="flex items-center justify-between w-[20rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-pink-500" /> Brand:{" "}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[20rem]">
                    <FaClock className="mr-2 text-emerald-400" /> Added:{" "}
                    {moment(product.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-amber-300" /> Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>

                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-amber-300" /> Ratings: {" "}
                    {product.rating.toFixed(1)}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2 text-blue-400" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[10rem]">
                    <FaBox className="mr-2 text-orange-400" /> In Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-1.5 w-[5rem] rounded-lg text-white border border-gray-400"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1} className="bg-black">
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-blue-400 rounded-lg hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300 text-white py-2 px-4 mt-4 md:mt-0 cursor-pointer"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="mt-[3rem] container flex flex-wrap items-start justify-between pl-[10rem] border-t-2 border-gray-600 pt-4">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;