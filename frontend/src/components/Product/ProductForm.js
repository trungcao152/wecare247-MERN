import { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";

const ProductForm = () => {
  const { dispatch } = useProductsContext();

  const [_id, set_id] = useState("");
  const [product_name, setProduct_name] = useState("");
  const [product_price, setProduct_price] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      _id,
      product_name,
      product_price,
      product_description,
    };

    console.log("product object:", product);

    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/products",
      {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }
    if (response.ok) {
      set_id("");
      setProduct_name("");
      setProduct_price("");
      setProduct_description("");

      setError(null);
      setEmptyFields([]);
      console.log("New product added", json);
      dispatch({ type: "CREATE_PRODUCT", payload: json });
    }
  };

  return (
    <div className="product-form">
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Product</h3>

        <label>Product ID:</label>
        <input
          type="text"
          onChange={(e) => set_id(e.target.value)}
          value={_id}
          className={emptyFields.includes("_id") ? "error" : ""}
        />

        <label>Product Name:</label>
        <input
          type="text"
          onChange={(e) => setProduct_name(e.target.value)}
          value={product_name}
          className={emptyFields.includes("product_name") ? "error" : ""}
        />

        <label>Product Price (in VND):</label>
        <input
          type="number"
          onChange={(e) => setProduct_price(e.target.value)}
          value={product_price}
          className={emptyFields.includes("product_price") ? "error" : ""}
        />

        <label>Product Description:</label>
        <input
          type="text"
          onChange={(e) => setProduct_description(e.target.value)}
          value={product_description}
          className={emptyFields.includes("product_description") ? "error" : ""}
        />

        <button>Add Product</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default ProductForm;
