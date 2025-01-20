import React, { useState } from "react";

const Cart = () => {
    // Inicjalny stan koszyka (przykładowe dane)
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Product 1",
            price: 29.99,
            quantity: 2,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            name: "Product 2",
            price: 59.99,
            quantity: 1,
            image: "https://via.placeholder.com/150",
        },
    ]);

    // Funkcja obsługująca zmianę ilości produktu
    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return; // Zapobiega ustawianiu ilości mniejszej niż 1

        const updatedItems = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
    };

    // Funkcja obsługująca usuwanie produktu z koszyka
    const handleRemoveItem = (id) => {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedItems);
    };

    // Obliczanie całkowitej ceny
    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="container py-4">
            <h2 className="mb-4">Your Cart</h2>
            <div className="row">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <img
                                    src={item.image}
                                    className="card-img-top"
                                    alt={item.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">Price: ${item.price}</p>
                                    <div className="mb-3">
                                        <label htmlFor={`quantity-${item.id}`} className="form-label">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            id={`quantity-${item.id}`}
                                            className="form-control"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleQuantityChange(item.id, parseInt(e.target.value))
                                            }
                                            min="1"
                                        />
                                    </div>
                                    <p className="card-text">
                                        <strong>Total: ${item.price * item.quantity}</strong>
                                    </p>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>Your cart is empty.</p>
                    </div>
                )}
            </div>

            {cartItems.length > 0 && (
                <>
                    <div className="row mt-4">
                        <div className="col-12 text-end">
                            <h4>Total: ${total.toFixed(2)}</h4>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-12 text-center">
                            <button className="btn btn-primary btn-lg mx-2">
                                Proceed to Checkout
                            </button>
                            <button className="btn btn-secondary btn-lg mx-2">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
