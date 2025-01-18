
import { useLocation, useNavigate } from "react-router-dom";

function MovieDetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const movie = location.state?.movie; //{movie} w stanie

    if (!movie) {
        return (
            <div>
                <p>No movie data available.</p>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    return (
        <div className="container py-1" >
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
                    <h1 className="mb-3">{movie.title_long}</h1>
                    <div className="row">
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

                    {movie.yt_trailer_code ? (
                        <div className="mt-4">
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

                    <div className="mt-4 text-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="btn btn-secondary"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailsPage;
//+ fetch opinii i ich map na <Opinion/>
