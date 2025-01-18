import React, {useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function AddOpinionForm({onAddOpinion}) {
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newOpinion = {
            name,
            rating,
            text,
            avatar: "https://via.placeholder.com/50", // Domyślny avatar
            date: new Date().toLocaleDateString(),
        };

        onAddOpinion(newOpinion);

        setName("");
        setRating(0);
        setText("");
    };


    const handleClick = (value) => {
        setRating(value);
    };

    const handleMouseEnter = (value) => {
        setHovered(value);
    };

    const handleMouseLeave = () => {
        setHovered(0);
    };


    return (<div className="add-opinion-form py-4">
        <h6>Add your opinion</h6>
        <Form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm">
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <div style={{ fontSize: "2rem", cursor: "pointer" }}>
                    {[1, 2, 3, 4, 5].map((rate) => (
                        <span key={rate}
                            onClick={() => handleClick(rate)}
                            onMouseEnter={() => handleMouseEnter(rate)}
                            onMouseLeave={handleMouseLeave}
                            className={`${rate <= (hovered || rating) ? "text-warning" : "text-muted"}`}>
                            ★ {/* tu chodzi że wartość hovered ma wyższy priorytet niż rating
                             a jeśli hovered = 0 = fałsz*/}
                        </span>
                    ))}
                </div>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit Opinion
            </Button>
        </Form>
    </div>);
}

export default AddOpinionForm;