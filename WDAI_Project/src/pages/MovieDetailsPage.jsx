
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
        <div className="container py-5">
            <div className="row g-4 align-items-center">
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
                            <p><strong>Summary:</strong> {movie.summary || "No description available."}</p>
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

export default MovieDetailsPage;//tu jakiś map opinii z bazy danych na unordered list
//może navigate('/component-b/${movie.id}', { state: { dupa: 'TwojArgument' } });
// i ewentualnie jak ktoś wpisze z palca to sprawdzamy czy stan został przekazany
//jeśli nie to <p> "Nie znaleziono filmu" </p>
// jeśli jest to wyświetlamy film...

//+ fetch opinii i ich map na <Opinion/>
