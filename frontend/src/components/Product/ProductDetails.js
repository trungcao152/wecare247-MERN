import { useProductsContext } from "../hooks/useProductsContext";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import "./Products.css"; // Import the CSS file

const ProductDetails = () => {
  const { dispatch } = useProductsContext();

  const handleDelete = async (product_id) => {
    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/products/" + product_id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PRODUCT", payload: json });
    }
  };

  // Props for the table title
  const tableTitle = "Product Database";

  return (
    <div className="products-container">
      <ProductForm />
      <ProductTable handleDelete={handleDelete} tableTitle={tableTitle} />
    </div>
  );
};

export default ProductDetails;
