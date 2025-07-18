import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[24rem] ml-[2rem] px-3 py-3 my-2 relative border border-gray-600 bg-[#1A1A1A] rounded-xl">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[30rem] rounded-lg"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span className="bg-blue-400 w-[6rem] text-sm font-medium px-2.5 py-0.5 rounded-full">
              ₹ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
