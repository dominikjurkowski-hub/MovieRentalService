import { Outlet, Link, useNavigate } from "react-router-dom";

function Layout() {
    const getYear = new Date().getFullYear();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token"); // Usuń token
        alert("You have been logged out.");
        navigate("/login"); // Przekieruj na stronę logowania
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">MyApp</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cart">Cart</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                {token ? (
                                    <>
                                        <li className="nav-item">
                                            <button
                                                className="btn btn-link nav-link"
                                                onClick={handleLogout}
                                                style={{ textDecoration: "none" }}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">Login</Link>
                                        </li>
                                    </>
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

            <footer className="bg-light text-center py-3 mt-auto">
                <p className="mb-0">&copy;{getYear} All Rights Reserved, data from yts.mx & omdb</p>
            </footer>
        </div>
    );
}

export default Layout;