import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import ImageSlider from "../components/imageSlider";

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Noise cancelling over-ear headphones with deep bass.",
    price: 2999,
    ratings: 4.5,
    image: [
      {
        public_id: "headphone1",
        url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      },
    ],
    category: "Electronics",
    stock: 25,
    numOfReviews: 5,
    reviews: [],
    user: "USER_OBJECT_ID_HERE",
    createdAt: "2026-02-26T05:00:00.000Z",
  },
  {
    name: "Smartphone 5G",
    description: "Latest smartphone with AMOLED display.",
    price: 18999,
    ratings: 4.2,
    image: [
      {
        public_id: "phone1",
        url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg",
      },
    ],
    category: "Electronics",
    stock: 40,
    numOfReviews: 0,
    reviews: [],
    user: "USER_OBJECT_ID_HERE",
    createdAt: "2026-02-26T05:00:00.000Z",
  },
  {
    name: "Gaming Laptop",
    description: "High performance gaming laptop with RTX graphics.",
    price: 89999,
    ratings: 4.8,
    image: [
      {
        public_id: "laptop1",
        url: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
      },
    ],
    category: "Electronics",
    stock: 10,
    numOfReviews: 0,
    reviews: [],
    user: "USER_OBJECT_ID_HERE",
    createdAt: "2026-02-26T05:00:00.000Z",
  },
  {
    name: "Men's Casual T-Shirt",
    description: "100% cotton comfortable casual wear.",
    price: 799,
    ratings: 4.1,
    image: [
      {
        public_id: "shirt1",
        url: "https://images.pexels.com/photos/1002644/pexels-photo-1002644.jpeg?auto=compress&cs=tinysrgb&w=600.jpg",
      },
    ],
    category: "Clothing",
    stock: 100,
    numOfReviews: 5,
    reviews: [],
    user: "USER_OBJECT_ID_HERE",
    createdAt: "2026-02-26T05:00:00.000Z",
  },
];

const Home = () => {
  return (
    <>
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
