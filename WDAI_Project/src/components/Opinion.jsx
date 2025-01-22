
function Opinion({ name, date, rating, text, avatar }) {
    return (
        <div className="opinion-card p-3 mb-3 border rounded shadow-sm">
            <div className="d-flex align-items-center mb-2">
                <img
                    src={avatar || "https://via.placeholder.com/50"}
                    alt={name}
                    className="rounded-circle me-2"
                    style={{ width: '50px', height: '50px' }}
                />
                <div>
                    <h5 className="mb-0">{name}</h5>
                    <small className="text-muted">{date}</small>
                </div>
            </div>
            <div className="mb-2">
                <strong>Rating: </strong>
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        className={index < rating ? "text-warning" : "text-muted"}
                    >
                        ★
                    </span>
                ))}
            </div>
            <p>{text}</p>
        </div>
    );
}
export default Opinion;