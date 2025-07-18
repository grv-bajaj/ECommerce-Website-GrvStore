import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { setCategories, setProducts, setChecked } from "../redux/features/shop/shopSlice";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector((state) => state.shop);
  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    // Filter products by brand when a brand radio button is clicked
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    // Update the checked state when a category checkbox is toggled
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    // Add "All Brands" option to uniqueBrands
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mt-[1.5rem] ml-[3rem] my-3">SHOP BY <span className="text-lime-300">FILTERS</span></h2>
        <div className="flex md:flex-row ml-3">
          <div className="bg-[#151515] p-3 mb-2">
            <h2 className="h4 text-center py-2 bg-black rounded-full font-semibold">
              Filter by Categories
            </h2>
            <div className="p-5 w-[15rem]">
              {categories?.map((c) => (
                <div key={c._id} className="mb-3">
                  <div className="flex ietms-center mr-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 appearance-none bg-gray-800 border-3 border-gray-600 rounded checked:bg-blue-400 checked:border-blue-100 checked:text-black checked:ring-1 checked:ring-blue-200"
                    />
                    <label
                      htmlFor="red-checkbox"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full font-semibold">
              Filter by Brands
            </h2>
            <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <>
                  <div className="flex items-enter mr-4 mb-3">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 appearance-none rounded-full bg-gray-800 border-3 border-gray-600 checked:bg-blue-400 checked:border-gray-200 p-1"
                    />
                    <label
                      htmlFor="pink-radio"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {brand}
                    </label>
                  </div>
                </>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full font-semibold">
              Filer by Price
            </h2>
            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-blue-200"
              />
            </div>
            <div className="p-5 pt-0">
              <button
                className="w-full my-2 bg-blue-400 font-semibold rounded-lg hover:bg-blue-500 px-3 py-1 cursor-pointer"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="px-3">
            <h2 className="h4 ml-2 my-1 text-2xl font-bold">Products ({products?.length})</h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <h2 className="text-center text-gray-400 mt-3 ml-2">No Products matched the filters.</h2>
              ) : (
                products?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;