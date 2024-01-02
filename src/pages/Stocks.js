import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const Stocks = ({ categories, handleLogout }) => {
  const [stocks, setStocks] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:8081/products');
      setStocks(response.data); // Ensure response.data is an array of objects
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const addStock = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/products', {
        name: name,
        quantity: quantity,
        price: price
      });
      setStocks([...stocks, response.data]);
      setName('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  const deleteStock = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/products/${id}`);
      const updatedStocks = stocks.filter(stock => stock.id !== id);
      setStocks(updatedStocks);
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };

  const editStock = async (id) => {
    // Implement edit functionality here
    // You can use a similar axios.put method to update the stock details
    // Modify this function according to your requirements
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Navbar categories={categories} handleLogout={handleLogout} />
      <h1>Stocks</h1>
      <form onSubmit={addStock}>
        {/* Your form inputs */}
      </form>
      <table style={{ margin: '0 auto', fontSize: '25px', borderCollapse: 'collapse', border: '1px solid #000' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Quantity</th>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Price</th>
            
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{stock.name}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{stock.qty}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>{stock.price}</td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>
              <button onClick={() => deleteStock(stock.id)}>Delete</button>
                <button className="btn btn-primary" onClick={() => editStock(stock.id)}>Edit</button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stocks;
