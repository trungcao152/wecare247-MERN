import React, { useState } from "react";
import TableHead from "../TableHead";
import TableBody from "../TableBody";
import ProductEditForm from "./ProductEditForm";
import { useProductsContext } from "../hooks/useProductsContext";
import useSortableData from "../hooks/useSortableData";

const ProductRow = ({
  product,
  handleDelete,
  properties,
  formatCellContent,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <tr key={product._id}>
      {isEditing ? (
        <td colSpan={properties.length + 1}>
          <ProductEditForm product={product} setIsEditing={setIsEditing} />
        </td>
      ) : (
        <>
          {properties.map((property) => (
            <td key={property}>{formatCellContent(product, property)}</td>
          ))}
          <td>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </td>
        </>
      )}
    </tr>
  );
};

const ProductTable = ({ handleDelete, tableTitle }) => {
  const { products = [] } = useProductsContext();
  const { sortedItems, requestSort, sortingKeys } = useSortableData(products);

  const columns = [
    "Product ID",
    "Product Name",
    "Product Price",
    "Product Description",
  ];

  const properties = [
    "_id",
    "product_name",
    "product_price",
    "product_description",
  ];

  const formatCellContent = (product, property) => {
    if (property === "national_id_issue_date") {
      return new Intl.DateTimeFormat("en-GB").format(
        new Date(product[property])
      );
    }
    return product[property];
  };

  return (
    <div className="products-table">
      <table>
        <TableHead
          columns={columns}
          properties={properties}
          tableTitle={tableTitle}
          requestSort={requestSort}
          sortingKeys={sortingKeys}
        />
        <TableBody>
          {sortedItems &&
            sortedItems.map((product) => (
              <ProductRow
                key={product._id}
                product={product}
                handleDelete={handleDelete}
                properties={properties}
                formatCellContent={formatCellContent}
              />
            ))}
        </TableBody>
      </table>
    </div>
  );
};

export default ProductTable;
