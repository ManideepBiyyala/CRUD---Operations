import axios from "axios";
import Form from "./Form";
import Table from "./Table";
import { createContext, useEffect, useState } from "react";

export const context = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch data from the server
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      fetchData(); // Refresh after delete
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddProduct = async (data) => {
    try {
      await axios.post("http://localhost:3000/products", data, {
        headers: { "Content-Type": "application/json" },
      });
      fetchData(); // Refresh after add
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`http://localhost:3000/products/${id}`, updatedProduct, {
        headers: { "Content-Type": "application/json" },
      });
      fetchData(); // Refresh after edit
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    setEditingProduct(null); // Reset the editing state
  };

  return (
    <context.Provider
      value={{
        toggleForm,
        handleAddProduct,
        handleEditProduct,
        isFormOpen,
        editingProduct,
        setEditingProduct,
      }}
    >
      <div className="wrapper m-5 w-50">
        <h2 className="text-primary">CRUD Operations</h2>
        <button className="btn btn-primary" onClick={toggleForm}>
          Add Product
        </button>
        <Table products={products} onDelete={handleDelete} />
        {isFormOpen && <Form />}
      </div>
    </context.Provider>
  );
}

export default App;
