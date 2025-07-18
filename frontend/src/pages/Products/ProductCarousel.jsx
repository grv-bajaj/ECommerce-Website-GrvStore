import { useGetTopProductsQuery } from "../../redux/api/productApiSlice.js"
import Message from "../../components/Message.jsx"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import moment from "moment"
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa"

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  }
  return (
    <div className="my-4 xl:block lg:block md:block border border-gray-600 rounded-lg bg-[#1A1A1A] p-4">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message }
        </Message>
       ) : <Slider {...settings} className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block">
        {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem]"
                />

                <div className="mt-4 flex justify-between">
                  <div className="one">
                    <h2 className="text-xl font-bold text-pink-100">{name}</h2>
                    <p className="text-emerald-200"> ₹ {price}</p> <br /> 
                    <p className="w-[25rem] text-white">
                      {description.substring(0, 180)} ...
                    </p>
                  </div>

                  <div className="flex justify-between w-[20rem]">
                    <div className="one">
                      <h1 className="flex items-center mb-6">
                        <FaStore className="mr-2 text-pink-500" /> Brand: {brand}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaClock className="mr-2 text-emerald-400" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2 text-amber-300" /> Reviews: {" "}
                        {numReviews}
                      </h1>
                    </div>

                    <div className="two">
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2 text-amber-300" /> Ratings:{" "}
                        {rating.toFixed(1)}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaShoppingCart className="mr-2 text-blue-400" /> Quantity:{" "}
                        {quantity}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaBox className="mr-2 text-orange-400" /> In Stock:{" "}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
       </Slider>
      }
    </div>
  )
};

export default ProductCarousel;