import React from "react";


function Movie ({ movie, onClick }){
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100" onClick={onClick} style={{ cursor: "pointer" }}>
                <img
                    src={movie.large_cover_image}
                    alt={movie.title_long}
                    className="card-img-top"
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                />
                <div className="card-body">
                    <h5 className="card-title">{movie.title_long}</h5>
                    <p className="card-text">
                        <strong>Rating:</strong> {movie.rating}
                    </p>
                    <p className="card-text">
                        {movie.genres[0]}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Movie;
