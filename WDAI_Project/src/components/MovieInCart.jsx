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

        <div className="card h-100" onClick={handleMovieClick}
             style={{ alignItems: 'center', cursor: 'pointer'}}>

            <img
                src={movie.medium_cover_image}
                alt={movie.title_long}
                className="card-img-top"
                style={{width: "295px", height: "350px", objectFit: "cover"}}
            />
            <div className="card-body p-2" > {/* Zmniejsz padding wewnątrz card-body */}
                <h5 className="card-title mb-3">{movie.title_long}</h5> {/* Normalna grubość czcionki dla tytułu */}
                <p className="card-text mb-1">
                    <span className="fw-medium">Rating:</span> {movie.rating} {/* Użyj fw-medium zamiast <strong> */}
                </p>
                <p className="card-text mb-1">
                    <span
                        className="fw-medium">Director:</span> {movie.Director || "Unknown"} {/* Użyj fw-medium zamiast <strong> */}
                </p>
                <p className="card-text mb-3">
                    <span
                        className="fw-medium">Price:</span> {movie.price?.toFixed(2) || "N/A"} $ {/* Użyj fw-medium zamiast <strong> */}
                </p>
                <div className="d-flex flex-column align-items-center text-center">
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={handleRemoveClick}
                    >
                        Remove from Cart
                    </button>
                </div>

            </div>
        </div>
    );
}

MovieInCart.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        medium_cover_image: PropTypes.string.isRequired,
        title_long: PropTypes.string.isRequired,
        rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        genres: PropTypes.arrayOf(PropTypes.string),
        Director: PropTypes.string,
        price: PropTypes.number,
    }).isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default MovieInCart;