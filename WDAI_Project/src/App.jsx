import HomePage from "./pages/HomePage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage.jsx";
import CartPage from "./pages/CartPage.jsx";


function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="movies/:movieId" element={<MovieDetailsPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
