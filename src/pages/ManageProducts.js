import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './Navbar';
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);

  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [qty, setQty] = useState(0);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8081/products");
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8081/categories");
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleQty = (event) => {
    setQty(event.target.value);
  };

  const handleCategory = (event) => {
    setCategoryId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: name,
      price: price,
      qty: qty,
      categoryId: categoryId,
    };

    try {
      const response = await axios.post("http://localhost:8081/products", data);
      setProducts([...products, response.data]);
      setName('');
      setPrice('');
      setQty(0);
      setCategoryId(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <>
      <Navbar categories={categories} />
      <h1 style={{ textAlign: 'center' }}>Manage Products</h1>

      <button onClick={getProducts}>Load Products</button>

      <ol>
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
          ))}
      </ol>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            required
            className="form-control"
            onChange={handleName}
            value={name || ''}
          />
        </div>
        <div>
          <label>Product Price</label>
          <input
            type="text"
            required
            onChange={handlePrice}
            value={price || ''}
          />
        </div>
        <div>
          <label>Product Qty</label>
          <input
            type="text"
            required
            onChange={handleQty}
            value={qty}
          />
        </div>
        <div>
          <label>Category</label>
          <select required onChange={handleCategory}>
            <option>Please Select</option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          Save Product
        </button>
      </form>
    </>
  );
};

export default ManageProducts;
