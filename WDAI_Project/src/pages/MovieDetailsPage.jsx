
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
        <div>
            <h1>{movie.title_long}</h1>
            <p><strong>Runtime:</strong>{movie.Runtime}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Director:</strong> {movie.Director || "Unknown"}</p>
            <p><strong>Summary:</strong> {movie.Plot || "No description available."}</p>
            <p><strong>Awards</strong> {movie.Awards}</p>
            <p><strong>Country</strong> {movie.Country}</p>

            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
}

export default MovieDetailsPage;//tu jakiś map opinii z bazy danych na unordered list
//może navigate('/component-b/${movie.id}', { state: { dupa: 'TwojArgument' } });
// i ewentualnie jak ktoś wpisze z palca to sprawdzamy czy stan został przekazany
//jeśli nie to <p> "Nie znaleziono filmu" </p>
// jeśli jest to wyświetlamy film...

//+ fetch opinii i ich map na <Opinion/>
export default MovieDetailsPage;