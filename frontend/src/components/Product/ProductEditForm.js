import { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";

const ProductEditForm = ({ product, setIsEditing }) => {
  const [formState, setFormState] = useState(product);
  const { dispatch } = useProductsContext();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      "https://wecare247-backend.onrender.com/api/products/" + product._id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      }
    );

    const updatedProduct = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
      setIsEditing(false);
    } else {
      // Show an error message as a popup
      window.alert("There is no such product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="product_name">
        Product Name:
        <input
          type="text"
          name="product_name"
          value={formState.product_name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="product_price">
        Product Price (in VND):
        <input
          type="number"
          name="product_price"
          value={formState.product_price}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="product_description">
        Product Description:
        <input
          type="text"
          name="product_description"
          value={formState.product_description}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductEditForm;
