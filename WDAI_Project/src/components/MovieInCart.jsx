import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function MovieInCart({ movie, onRemove }) {
    const navigate = useNavigate();

    const handleMovieClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(`/movies/${movie.movieId}`, { state: { movie } });
    };

    // Domyślne zdjęcie, jeśli `image` jest brakujące
    const defaultImage = "https://via.placeholder.com/300x450?text=No+Image+Available";

    return (
        <div className="card h-100" onClick={handleMovieClick} style={{ cursor: "pointer" }}>
            <img
                src={movie.image || defaultImage} // Użyj domyślnego zdjęcia, jeśli brakuje
                alt={movie.title}
                className="card-img-top"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">
                    <strong>Rating:</strong> {movie.rating || "N/A"}
                </p>
                <p className="card-text">
                    <strong>Genre:</strong> {movie.genres?.[0] || "N/A"}
                </p>
                <button
                    className="btn btn-danger mt-2"
                    onClick={(e) => {
                        e.stopPropagation(); // Zapobiegaj przejściu do strony filmu po kliknięciu przycisku
                        onRemove();
                    }}
                >
                    Remove from Cart
                </button>
            </div>
        </div>
    );
}

MovieInCart.propTypes = {
    movie: PropTypes.shape({
        movieId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        image: PropTypes.string,
        title: PropTypes.string.isRequired,
        rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        genres: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default MovieInCart;