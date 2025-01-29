import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import { FaHome, FaShoppingCart, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; // Importing icons

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
                            className={`navbar-toggler ${darkMode ? "navbar-dark" : "navbar-light"}`}
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
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-start align-items-center">
                                <li className="nav-item mx-2">
                                    <Link
                                        className={`nav-link fs-5 d-flex justify-content-center align-items-center ${darkMode ? "text-light" : "text-dark"}`}
                                        to="/">
                                        <FaHome className="me-2"/>
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link
                                        className={`nav-link fs-5 d-flex justify-content-center align-items-center ${darkMode ? "text-light" : "text-dark"}`}
                                        to="/cart">
                                        <FaShoppingCart className="me-2"/>
                                        <span>Cart</span>
                                        {isTokenGiven() && (
                                            <span
                                                className={`badge ms-2 ${cartTotalPrice > 0 ? "bg-success" : "bg-secondary"}`}>
                ${cartTotalPrice.toFixed(2)}
              </span>
                                        )}
                                    </Link>
                                </li>
                            </ul>

                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <button
                                        className="btn btn-link nav-link fs-5"
                                        onClick={toggleDarkMode}
                                        style={{textDecoration: "none"}}
                                    >
                                        {darkMode ? "🌙" : "☀️"}
                                    </button>
                                </li>
                                {token ? (
                                    <li className="nav-item">
                                        <button
                                            className={`btn btn-link nav-link fs-5 ${darkMode ? "text-light" : "text-dark"}`}
                                            onClick={handleLogout}
                                            style={{textDecoration: "none"}}
                                        >
                                            <FaSignOutAlt className="me-2"/>
                                            Logout
                                        </button>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link className={`nav-link fs-5 ${darkMode ? "text-light" : "text-dark"}`}
                                              to="/login">
                                            <FaSignInAlt className="me-2"/>
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
                    <Outlet context={{updateCartTotalPrice}}/>
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
