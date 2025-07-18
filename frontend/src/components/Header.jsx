import { useGetTopProductsQuery } from "../redux/api/productApiSlice"
import SmallProduct from "../pages/Products/SmallProduct.jsx"
import Loader from "./Loader.jsx"
import ProductCarousel from "../pages/Products/ProductCarousel.jsx"

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery()
  if (isLoading) {
    return <Loader />
  }
  if (error) {
     return <h1>ERROR</h1>
  }

  return (
    <>
      <div className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden sm:hidden pr-16 border-r-2 border-gray-600">
            <div className="grid grid-cols-2">
                {data.map((product) => (
                  <div key={product._id}>
                    <SmallProduct product={product} />
                  </div>
                ))}     
            </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  )
}

export default Header