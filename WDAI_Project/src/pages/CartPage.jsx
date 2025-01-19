import React, { useEffect, useState } from "react";
import MovieInCart from "../components/MovieInCart";

function CartPage() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
    }, []);

    const handleRemoveFromCart = (movieId) => {
        const updatedCart = cartItems.filter((item) => item.id !== movieId);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    if (cartItems.length === 0) {
        return <h3 className="text-center mt-5">Your cart is empty!</h3>;
    }

    return (
        <div className="container py-5">
            <h2>Your Cart</h2>
            <div className="row">
                {cartItems.map((movie) => (
                    <div className="col-md-4 mb-4" key={movie.id}>
                        <MovieInCart
                            movie={movie}
                            onRemove={() => handleRemoveFromCart(movie.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CartPage;
