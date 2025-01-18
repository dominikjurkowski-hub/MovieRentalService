import SearchBar from "../components/SearchBar.jsx";
import {useEffect, useState} from "react";
import Movie from "../components/Movie.jsx";

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const enrichMoviesWithOMDb = async (movies) => {// Funkcja do wzbogacania filmów o dane z OMDb
        return Promise.all(
            movies.map(async (movie) => {
                if (movie.imdb_code) {
                    const omdbResponse = await fetch(
                        `https://www.omdbapi.com/?i=${movie.imdb_code}&apikey=e23afbb8`
                    );

                    if (omdbResponse.ok) {
                        const omdbData = await omdbResponse.json();
                        return {...movie, ...omdbData};
                    }
                }
                return movie;
            })
        );
    };


    const fetchInitialMovies = async () => {// Pobieranie filmów domyślnych (pierwsze ładowanie strony)
        try {
            setLoading(true);
            const response = await fetch(`https://yts.mx/api/v2/list_movies.json?page=${getRandomInt()}`);
            await checkIfResponseOk(response);
        } catch (error) {
            console.error("Error fetching initial movies:", error);
        } finally {
            setLoading(false);
        }
    };


    const fetchMoviesBySearch = async (searchValue) => {// Pobieranie filmów według zapytania użytkownika
        try {
            setLoading(true);
            const response = await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${searchValue}`);
            if (!await checkIfResponseOk(response)) {
                setMovies([]);
                setFilteredMovies([]);
            }
        } catch (error) {
            console.error("Error fetching searched movies:", error);
        } finally {
            setLoading(false);
        }
    };


    const checkIfResponseOk = async (response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (data && data.data && Array.isArray(data.data.movies)) {
            const enrichedMovies = await enrichMoviesWithOMDb(data.data.movies);
            setMovies(enrichedMovies);
            setFilteredMovies(enrichedMovies);
            return true;
        }
        return false;
    }


    const handleSearch = (searchValue) => {
        if (searchValue.trim() === "" || searchValue === " " || searchValue === null) {
            fetchInitialMovies();
            setFilteredMovies(movies); // Resetuje filtry
        } else {
            fetchMoviesBySearch(searchValue);
        }
    };

    // Pierwsze ładowanie filmów
    useEffect(() => {
        fetchInitialMovies();
    }, []);

    function getRandomInt() {
        return Math.floor(Math.random() * 100) + 1;
    }

    return (
        <>
            <SearchBar searchingFor={handleSearch}/>
            <div className="container mt-4">
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : filteredMovies.length > 0 ? (
                    <div className="row">
                        {filteredMovies.map((movie) => (
                            <Movie key={movie.id} movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No movies found...</p>
                )}
            </div>
        </>
    );
}

export default HomePage;