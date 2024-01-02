import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar'; 

const Category = () => {
    const [categories, setCategories] = useState([]);
    const params = useParams();

    const handleLogout = () => {};

    
    const getCategories = async () => {
        try {
          const response = await axios.get("http://localhost:8081/categories");
          setCategories(response.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <Navbar categories={categories} handleLogout={handleLogout} />
            <h1 style={{ textAlign: 'center' }}>Categories</h1>
            <div className="container mt-5">
                <div className="row">
                    {categories.map((category) => (
                        <div key={category.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img
                                    src={category.imageUrl}
                                    className="card-img-top"
                                    alt={category.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{category.name}</h5>
                                    <Link  className="btn btn-primary">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Category;
