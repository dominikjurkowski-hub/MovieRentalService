import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';

function Layout() {
    const getYear = new Date().getFullYear();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [darkMode, setDarkMode] = useState(false);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    // Funkcja do aktualizacji sumy cen
    const updateCartTotalPrice = async () => {
        if (token) {
            const response = await fetch("http://localhost:5000/api/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                const totalPrice = data.reduce((sum, movie) => sum + movie.price, 0);
                setCartTotalPrice(totalPrice);
            } else {
                console.error("Failed to fetch cart items");
            }
        }
    };

    // Efekt do pobrania sumy cen przy pierwszym renderowaniu
    useEffect(() => {
        updateCartTotalPrice();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setCartTotalPrice(0);
        alert("You have been logged out.");
        navigate("/login");
    };

    const isTokenGiven = () => {
        return !!localStorage.getItem("token");
    }

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`d-flex flex-column min-vh-100 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
            <header className={`sticky-top shadow-lg ${darkMode ? "bg-dark" : "bg-light"}`}>
                <nav className="navbar navbar-expand-lg py-1">
                    <div className="container">
                        <Link className={`navbar-brand fs-3 fw-bold ${darkMode ? "text-light" : "text-dark"}`} to="/">
                            <img src={logo} alt="Logo" width="55px" style={{borderRadius: 5}}/>
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <Link className={`nav-link fs-5 ${darkMode ? "text-light" : "text-dark"}`} to="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link fs-5 ${darkMode ? "text-light" : "text-dark"}`} to="/cart">
    <span className="d-flex align-items-center">
        Cart
        <span
            className={`badge rounded-pill ms-2 ${cartTotalPrice > 0 ? "bg-success" : "bg-secondary"}`}
            style={{ fontSize: "1.1rem", display: isTokenGiven() ? "inline" : "none" }}
        >
            ${cartTotalPrice.toFixed(2)}
        </span>
    </span>
                                    </Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                {token ? (
                                    <li className="nav-item ">
                                        <Link className={`nav-link fs-5 ${darkMode ? "text-light" : "text-dark"}`} to="/placedOrders">
                                            <img src= {avatar} width="25px" height="25px" title="zamówienia" alt="Author Freepik" />
                                        </Link>
                                    </li>
                                ) : null}
                                <li className="nav-item me-3">
                                    <button
                                        className="btn btn-link nav-link fs-5"
                                        onClick={toggleDarkMode}
                                        style={{ textDecoration: "none" }}
                                    >
                                        {darkMode ? "🌙" : "☀️"}
                                    </button>
                                </li>
                                {token ? (
                                    <li className="nav-item ms-auto">
                                        <button
                                            className={`btn btn-link nav-link fs-5 ${darkMode ? "text-light" : "text-dark"}`}
                                            onClick={handleLogout}
                                            style={{ textDecoration: "none" }}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link className={`nav-link fs-5 ${darkMode ? "text-light" : "text-dark"}`} to="/login">
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-grow-1">
                <div className="container py-4">
                    {/* Przekazanie funkcji aktualizującej do Outlet */}
                    <Outlet context={{ updateCartTotalPrice }} />
                </div>
            </main>

            <footer className={`text-center py-3 mt-auto ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
                <p className="mb-0">
                    &copy;{getYear} All Rights Reserved, data from yts.mx & omdb
                </p>
            </footer>
        </div>
    );
}

export default Layout;