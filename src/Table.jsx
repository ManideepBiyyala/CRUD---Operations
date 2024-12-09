import { context } from "./App";
import { useContext } from "react";

function Table({ products, onDelete }) {
  const { setIsFormOpen, setEditingProduct } = useContext(context);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  return (
    <table className="table table-bordered mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.category}</td>
            <td>
              <button
                className="btn btn-warning m-2"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
