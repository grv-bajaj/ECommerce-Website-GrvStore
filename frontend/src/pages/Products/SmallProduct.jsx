import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[17rem] ml-[2rem] p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-auto rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div>{product.name}</div>
            <span className="bg-blue-400 w-[7rem] text-xs font-medium  px-2 py-0.5 rounded-full">
              ₹ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
