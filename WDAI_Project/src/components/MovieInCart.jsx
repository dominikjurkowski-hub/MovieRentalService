import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function MovieInCart({ movie, onRemove }) {
    const navigate = useNavigate();

    const handleMovieClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(`/movies/${movie.id}`, { state: { movie } });
    };

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        onRemove();
    };

    return (
        <div className="card h-100" onClick={handleMovieClick} style={{ cursor: "pointer" }}>
            <img
                src={movie.large_cover_image}
                alt={movie.title_long}
                className="card-img-top"
                style={{ width: "100%", height: "auto" }}
            />
            <div className="card-body">
                <h5 className="card-title">{movie.title_long}</h5>
                <p className="card-text">
                    <strong>Rating:</strong> {movie.rating}
                </p>
                <p className="card-text">
                    <strong>Director:</strong> {movie.Director || "Unknown"}
                </p>
                <p className="card-text">
                    <strong>Price:</strong> {movie.price?.toFixed(2) || "N/A"} $
                </p>
                <button
                    className="btn btn-danger mt-2"
                    onClick={handleRemoveClick} // Użyj nowej funkcji
                >
                    Remove from Cart
                </button>
            </div>
        </div>
    );
}

MovieInCart.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        large_cover_image: PropTypes.string.isRequired,
        title_long: PropTypes.string.isRequired,
        rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        genres: PropTypes.arrayOf(PropTypes.string),
        Director: PropTypes.string,
    }).isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default MovieInCart;