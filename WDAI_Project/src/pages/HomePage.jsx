//lista movies krótki opis
//fetchujemy z bazy filmy i mapujemy je na <Movie/>
//z np title, rok, autor, krótki, ocena


import SearchBar from "../components/SearchBar.jsx";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import Movie from "../components/Movie.jsx";

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const navigate = useNavigate();
    // TRZEBA DODAĆ ROUTER WTEDY ZADZIAŁA NAWIGACJA I NIŻEJ <li>

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("https://yts.mx/api/v2/list_movies.json?page=1");

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();

                if (data && data.data && Array.isArray(data.data.movies)) {
                    const moviesWithDetails = await Promise.all(
                        data.data.movies.map(async (movie) => {
                            if (movie.imdb_code) {
                                const omdbResponse = await fetch(
                                    `https://www.omdbapi.com/?i=${movie.imdb_code}&apikey=e23afbb8`
                                );

                                if (!omdbResponse.ok) {
                                    console.error(`Failed to fetch details for movie: ${movie.title}`);
                                    return movie;
                                }

                                const omdbData = await omdbResponse.json();

                                if (omdbData) {
                                    return { ...movie, ...omdbData };
                                }
                            }

                            return movie;
                        })
                    );

                    setMovies(moviesWithDetails);
                    setFilteredMovies(moviesWithDetails);
                } else {
                    throw new Error("Invalid data structure");
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();

        const timeout = setTimeout(() => {
            const productElements = document.querySelectorAll(".product-item");
            productElements.forEach((el) => {
                el.style.transition = "transform 0.5s";
                el.style.transform = "translateY(-20px)";
            });

            setTimeout(() => {
                productElements.forEach((el) => {
                    el.style.transform = "translateY(0)";
                });
            }, 500);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    const handleSearch = (searchValue) => {
        const filtered = movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredMovies(filtered);
    };

    return (
        <>
            <SearchBar searchingFor={handleSearch} />
            <div className="container mt-4">
                {movies.length > 0 ? (
                    <div className="row">
                        {filteredMovies.map((movie) => (
                            <Movie
                                key={movie.id}
                                movie={movie}
                                onClick={() => navigate(`/movies/${movie.id}`, { state: { movie } })}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center">Movie not found...</p>//to bym chyba usunął bo jak sie odswieza to jest zawsze Movie not found ale tez jak nie ma takiego filmu to pasowało by to napisac nwm
                )}
            </div>
        </>
    );
}

export default HomePage;