import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  return (
    <>
    <h1 className="text-4xl font-bold ml-[5rem] mt-[1.5rem]">
        HOME <span className="text-green-400">PAGE</span>
      </h1>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[8rem] text-[3rem]"> 
              Special Products
            </h1>
            <Link to="/shop" className="bg-blue-400 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]">
              Shop
            </Link>
          </div>
          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;