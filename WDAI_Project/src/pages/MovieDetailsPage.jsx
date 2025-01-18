
import { useLocation, useNavigate } from "react-router-dom";
import Opinion from "../components/Opinion.jsx";
import AddOpinionForm from "../components/AddOpinionForm.jsx";

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

    const addOpinion = (newOpinion) => {
        //cuś backend...
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
                <AddOpinionForm onAddOpinion={addOpinion}/>
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
//+ fetch opinii i ich map na <Opinion/>


///////////////////////////PRZYKŁADOWA OPINIA
const opinions = [
    {
        name: "John Doe",
        date: "January 18, 2025",
        rating: 4,
        text: "This movie was absolutely fantastic! The plot was gripping, the performances were stellar, and I couldn't take my eyes off the screen. Highly recommend!",
        avatar: "https://via.placeholder.com/50"
    },
    {
        name: "Jane Smith",
        date: "January 19, 2025",
        rating: 5,
        text: "I loved this movie! Every scene was so well thought out. The acting was brilliant and the visuals were stunning. A must-see for anyone who loves cinema!",
        avatar: "https://via.placeholder.com/50/FF6347/FFFFFF?Text=Jane+Smith"
    },
    {
        name: "Tom Brown",
        date: "January 20, 2025",
        rating: 3,
        text: "It was a good movie, but it didn't really live up to the hype. The story was okay, but I expected more. The acting was fine, though.",
        avatar: "https://via.placeholder.com/50/ADD8E6/FFFFFF?Text=Tom+Brown"
    },
    {
        name: "Emily Clark",
        date: "January 22, 2025",
        rating: 2,
        text: "Not a fan of this movie. It felt a bit too long and the pacing was slow. I didn't connect with the characters as much as I hoped.",
        avatar: "https://via.placeholder.com/50/98FB98/FFFFFF?Text=Emily+Clark"
    },
    {
        name: "Michael Johnson",
        date: "January 23, 2025",
        rating: 4,
        text: "Great action sequences and a solid storyline. A few predictable moments, but overall a fun ride. Worth watching for action lovers.",
        avatar: "https://via.placeholder.com/50/FFD700/FFFFFF?Text=Michael+Johnson"
    }
];