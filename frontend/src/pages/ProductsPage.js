import { useEffect } from "react";
import { useProductsContext } from "../components/hooks/useProductsContext";
import SearchContainer from "../components/SearchContainer";

// components
import ProductDetails from "../components/Product/ProductDetails";

const Home = () => {
  const { dispatch } = useProductsContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://wecare247-backend.onrender.com/api/products"
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <div className="home">
      <header>
        <SearchContainer />
      </header>
      <div className="products">
        <ProductDetails />
      </div>
    </div>
  );
};

export default Home;
