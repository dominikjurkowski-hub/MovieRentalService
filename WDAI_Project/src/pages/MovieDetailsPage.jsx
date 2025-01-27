import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import Opinion from "../components/Opinion.jsx";
import AddOpinionForm from "../components/AddOpinionForm.jsx";
import { useEffect, useState } from "react";

function MovieDetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isInCart, setIsInCart] = useState(false);
    const [opinions, setOpinions] = useState([]);
    const movie = location.state?.movie;
    const token = localStorage.getItem("token");
    const { updateCartTotalPrice } = useOutletContext(); // Odbieramy funkcję z kontekstu

    if (!movie) {
        return (
            <div>
                <p>No movie data available.</p>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    useEffect(() => {
        // Sprawdź, czy film jest już w koszyku użytkownika
        const checkIfMovieIsInCart = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/cart", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const cartItems = await response.json();
                    const isAlreadyInCart = cartItems.some((item) => item.id === movie.id);
                    setIsInCart(isAlreadyInCart);
                } else {
                    console.error("Error fetching cart items:", response.statusText);
                }
            } catch (error) {
                console.error("Error checking cart:", error);
            }
        };

        if (token) {
            checkIfMovieIsInCart();
        }
    }, [movie, token]);

    useEffect(() => {
        const fetchOpinions = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/reviews/${movie.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setOpinions(data);
                } else {
                    console.error("Error fetching opinions:", data.error);
                }
            } catch (error) {
                console.error("Error fetching opinions:", error);
            }
        };

        fetchOpinions();
    }, [movie.id]);

    const addOpinion = async (newOpinion) => {
        try {
            const response = await fetch("http://localhost:5000/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newOpinion),
            });

            const data = await response.json();
            if (response.ok) {
                setOpinions((prevOpinions) => [...prevOpinions, data]); // Dodaj nową opinię do stanu
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error submitting opinion:", error);
            alert("There was an error submitting your opinion.");
        }
    };

    const handleAddToCart = async () => {
        if (!token) {
            alert("Please log in to add movies to your cart.");
            navigate("/login");
            return;
        }

        try {
            // Oblicz cenę filmu (jeśli nie jest przekazana w obiekcie movie)
            const movieWithPrice = {
                ...movie,
                price: (12 + 2 * Math.log(movie.id) + 4 * Math.sin(movie.id)) / 4,
            };

            const response = await fetch("http://localhost:5000/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ movie: movieWithPrice }),
            });

            if (response.ok) {
                setIsInCart(true);
                updateCartTotalPrice(); // Aktualizacja sumy cen po dodaniu filmu
            } else {
                const data = await response.json();
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error adding movie to cart:", error);
            alert("There was an error adding the movie to your cart.");
        }
    };

    const handleGoToCart = () => {
        navigate("/cart");
    };

    return (
        <div className="container py-1">
            <div className="row g-4">
                <div className="col-md-4 text-center">
                    <img
                        src={movie.large_cover_image}
                        alt={movie.title}
                        className="img-fluid rounded shadow"
                        style={{
                            width: "750",
                            height: "auto",
                        }}
                    />
                </div>

                <div className="col-md-8">
                    <h2 className="mb-3">{movie.title_long}</h2>
                    <div className="row fs-6">
                        <div className="col-sm-6 mb-3">
                            <p><strong>Runtime:</strong> {movie.runtime || "N/A"} min</p>
                            <p><strong>Rating:</strong> {movie.rating || "N/A"}</p>
                            <p><strong>Year:</strong> {movie.year || "N/A"}</p>
                            <p><strong>Country:</strong> {movie.country || "N/A"}</p>
                        </div>
                        <div className="col-sm-6 mb-3">
                            <p><strong>Director:</strong> {movie.Director || "Unknown"}</p>
                            <p><strong>Summary:</strong> {movie.Plot || "No description available."}</p>
                            <p><strong>Awards:</strong> {movie.Awards || "N/A"}</p>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary mt-3"
                        onClick={isInCart ? handleGoToCart : handleAddToCart}
                    >
                        {isInCart ? "Go to Cart" : "Add to Cart"}
                    </button>

                    {movie.yt_trailer_code ? (
                        <div className="mt-2">
                            <h5>Trailer</h5>
                            <div className="ratio ratio-16x9">
                                <iframe
                                    src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
                                    title="YouTube trailer"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-4 text-muted">Trailer not available.</p>
                    )}
                </div>
            </div>

            <div className="container py-5">
                <h3>Opinions</h3>
                <AddOpinionForm onAddOpinion={addOpinion} />
                <div className="opinion-container mb-4">
                    {opinions.map((opinion, index) => (
                        <Opinion key={index} {...opinion} />
                    ))}
                </div>
            </div>
            <div className="mt-4 text-center">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-secondary"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default MovieDetailsPage;