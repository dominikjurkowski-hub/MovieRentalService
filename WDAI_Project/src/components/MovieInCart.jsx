
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";




function MovieInCart({ movie, onRemove }) {

    const navigate = useNavigate();

    const handleMovieClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(`/movies/${movie.id}`, { state: { movie } });
    };



    return (
        <div className="card h-100" onClick={handleMovieClick}  style={{ cursor: "pointer" }}>
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
                    <strong>Genre:</strong> {movie.genres?.[0] || "N/A"}
                </p>
                <button
                    className="btn btn-danger mt-2"
                    onClick={onRemove}
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
    }).isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default MovieInCart;
