import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Checkout = ({ categories, handleLogout }) => {
    const [products, setProducts] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8081/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const createOrder = async () => {
        try {
            const productIds = orderProducts.map(obj => obj.id);
            const data = {
                products: productIds
            };
            const response = await axios.post("http://localhost:8081/orders", data);

            if (response.status === 201) {
                setOrderProducts([]);
                setTotal(0);
                setTax(0);
                console.log('Order created successfully!');
            } else {
                console.error('Failed to create order.');
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    }

    const addToOrder = (product) => {
        setOrderProducts([...orderProducts, product]);
        setTotal(total + product.price);
    }

    return (
        <>
            <Navbar categories={categories} handleLogout={handleLogout} />
            <h1 style={{ textAlign: 'center' }}>Checking Out</h1>
            <div className="col-md-4">.</div>
            <div className="col-md-4">.</div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <h2>Available Products</h2>
                        {products.map(product => (
                            <div className="product-box px-2 py-2" key={product.id}>
                                {product.name} - {product.price}
                                <button className="btn btn-sm btn-primary" onClick={() => addToOrder(product)}>
                                    Add to Order
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4">
                        <h2>Order Summary</h2>
                        <table className="table table-stripped">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderProducts.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <thead>
                                <tr>
                                    <th colSpan={2}>Total</th>
                                    <th>{total}</th>
                                </tr>
                                <tr>
                                    <th colSpan={2}>Tax</th>
                                    <th>{tax}</th>
                                </tr>
                            </thead>
                        </table>
                        <button className="btn btn-secondary" onClick={createOrder}>Complete Order</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;
