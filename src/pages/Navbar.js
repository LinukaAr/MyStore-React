import { Link, useNavigate } from "react-router-dom";
import React from 'react';

const Navbar = ({ categories }) => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        navigate("/login"); // Use navigate function for navigation
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">My Store</Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/manage-products" className="nav-link px-3">Manage Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/categories" className="nav-link px-3">Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/stocks" className="nav-link px-3">Stocks</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/checkout" className="nav-link px-3">Checkout</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <button className="btn btn-secondary ms-auto" onClick={handleLogoutClick}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
