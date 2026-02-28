import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Product from "../components/Product";
import ImageSlider from "../components/imageSlider";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProduct, removeErrors } from "../features/products/productSlice";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const Home = () => {
  const { products, productCount, loading, error } = useSelector(
    (state) => state.product,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <PageTitle title={`E-Commerce | Home`} />
      <Navbar />
      <ImageSlider />

      <div className="mt-12 p-8 flex flex-col items-center justify-around text-gray-900 ">
        <h1 className="text-4xl font-semibold text-blue-700 text-center drop-shadow-sm mb-8">
          Latest Collections
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
