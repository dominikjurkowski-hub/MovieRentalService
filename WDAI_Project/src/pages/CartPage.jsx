import React, { useEffect, useState } from "react";
import MovieInCart from "../components/MovieInCart";

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCart = async () => {
            const response = await fetch("http://localhost:5000/api/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Fetched cart data:", data);
                setCartItems(data);
            } else {
                alert("Failed to fetch cart items");
            }
        };

        if (token) {
            fetchCart();
        }
    }, [token]);

    const handleRemoveFromCart = async (movieId) => {
        const response = await fetch(`http://localhost:5000/api/cart/${movieId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== movieId));
        } else {
            alert("Failed to remove item from cart");
        }
    };

    if (!token) {
        return <h3 className="text-center mt-5">Please log in to view your cart.</h3>;
    }

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