import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar'; // Ensure correct path to your Navbar component

const Category = () => {
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState(null);
    const params = useParams();

    // Define categories and handleLogout or get them from somewhere else
    const categories = []; // Define your categories here
    const handleLogout = () => {}; // Define your handleLogout function here

    const getCategory = () => {
        fetch(`http://localhost:8081/categories/${params.id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCategory(data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getProductsByCategory = () => {
        fetch(`http://localhost:8081/categories/${params.id}/products`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setProducts(data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getCategory();
        getProductsByCategory();
    }, []);

    return (
        <>
            <Navbar categories={categories} handleLogout={handleLogout} />
            <h1 style={{ textAlign: 'center' }}>Categories</h1>
            {category && <h1>{category.name}</h1>}
            <ol>
                {products && products.map((product) => (
                    <li key={product.id}><Link to={`/products/${product.id}`}>{product.name}</Link></li>
                ))}
            </ol>
        </>
    );
};

export default Category;
