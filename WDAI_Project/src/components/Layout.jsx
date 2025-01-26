import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Layout() {
    const getYear = new Date().getFullYear();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [darkMode, setDarkMode] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("You have been logged out.");
        navigate("/login");
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`d-flex flex-column min-vh-100 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
            {/* Header */}
            <header className={`sticky-top shadow-lg ${darkMode ? "bg-dark" : "bg-light"}`}>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <Link className={`navbar-brand fs-3 fw-bold ${darkMode ? "text-light" : "text-dark"}`} to="/">
                            MyApp
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
                                        Cart
                                    </Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
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
                    <Outlet />
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