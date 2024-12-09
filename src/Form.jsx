import { useState, useContext, useEffect } from "react";
import { context } from "./App";

function Form() {
  const { setIsFormOpen, handleAddProduct, handleEditProduct, editingProduct } =
    useContext(context);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
      });
    } else {
      setFormData({
        name: "",
        price: "",
        category: "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      handleEditProduct(editingProduct.id, formData);
    } else {
      handleAddProduct(formData);
    }
  };

  return (
    <div className="form-overlay">
      <form className="p-3" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-2">
          <label>Price:</label>
          <input
            className="form-control"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-2">
          <label>Category:</label>
          <select
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="mobiles">Mobiles</option>
            <option value="laptops">Laptops</option>
            <option value="tv">TV</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {editingProduct ? "Update" : "Add"}
        </button>
        <button
          type="button"
          className="btn btn-danger mt-3 ms-2"
          onClick={() => setIsFormOpen(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Form;
