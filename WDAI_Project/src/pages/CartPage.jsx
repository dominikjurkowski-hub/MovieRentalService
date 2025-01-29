import { useEffect, useState } from "react";
import MovieInCart from "../components/MovieInCart";
import {useNavigate, useOutletContext} from "react-router-dom";

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const token = localStorage.getItem("token");
    const { updateCartTotalPrice } = useOutletContext();
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            const response = await fetch("http://localhost:5000/api/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
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
        try {
            const response = await fetch(`http://localhost:5000/api/cart/${movieId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            //lub w body movieId zamiast w URL ale niektóre serwery nie ignorują body w DELETE
            const data = await response.json();
            if (response.ok) {
                setCartItems((prevItems) => prevItems.filter((item) => item.id !== movieId));
                updateCartTotalPrice();
            } else {
                console.error("Error removing item from cart:", data.error);
                alert("Failed to remove item from cart: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
            alert("There was an error removing the item from your cart.");
        }
    };

    const handleOrderClick = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    if (!token) {
        return <h3 className="text-center mt-5">Please log in to view your cart.</h3>;
    }

    if (cartItems.length === 0 && !orderConfirmed) {
        return <h3 className="text-center mt-5">Your cart is empty!</h3>;
    }

    const handleConfirmOrder = () => {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

        if (!address || !paymentMethod || !email || !emailPattern.test(email)) {
            alert("Please fill in all fields correctly and select a payment method.");
            return;
        }

        const addOrder = async () => {
            const response = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    address,
                    paymentMethod,
                    totalPrice: calculateTotalPrice(),
                    status: "pending",
                    cartItems,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Order added:", data);
            } else {
                console.error("Error adding order:", data.error);
                alert("Failed to add order: " + (data.error || "Unknown error"));
            }
        }

        addOrder();


        cartItems.map((movie) => {handleRemoveFromCart(movie.id)});
        setCartItems([]);
        setOrderConfirmed(true);
        setIsFormVisible(false);

        alert("Order confirmed! Thank you for your purchase.");
    };

    const handleClose = () => {
        navigate("/");
    }

    return (
        <div className="container py-1">
            <h3 className="pb-2">Your Cart</h3>
            <div className="row">
                {cartItems.map((movie) => (
                    <div className="col-md-3 mb-4" key={movie.id}>
                        <MovieInCart
                            movie={movie}
                            onRemove={() => handleRemoveFromCart(movie.id)}
                        />
                    </div>
                ))}
            </div>

            <div className="text-center mt-4">
                <button className="btn btn-primary" style={{display: isFormVisible || orderConfirmed ? "none" : "inline" }} onClick={handleOrderClick}>
                    Złóż zamówienie
                </button>
            </div>

            {isFormVisible && (
                <div className="mt-4 p-4 border rounded">
                    <h4>Finalize Your Order</h4>

                    {/* Pole adresu */}
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            value={address}
                            onChange={handleAddressChange}
                            required
                        />
                    </div>

                    {/* Pole e-mail z walidacją */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        />
                        <div className="invalid-feedback">
                            Please provide a valid email address.
                        </div>
                    </div>

                    {/* Metody płatności */}
                    <div className="mb-3">
                        <label className="form-label">Payment Method</label>
                        <div className="d-flex justify-content-around">
                            <button
                                className={`btn ${paymentMethod === "credit_card" ? "btn-success" : "btn-outline-secondary"}`}
                                onClick={() => handlePaymentMethodChange("credit_card")}
                            >
                                💳 Credit Card
                            </button>
                            <button
                                className={`btn ${paymentMethod === "paypal" ? "btn-success" : "btn-outline-secondary"}`}
                                onClick={() => handlePaymentMethodChange("paypal")}
                            >
                                📦 PayPal
                            </button>
                            <button
                                className={`btn ${paymentMethod === "blik" ? "btn-success" : "btn-outline-secondary"}`}
                                onClick={() => handlePaymentMethodChange("blik")}
                            >
                                📲 BLIK
                            </button>
                        </div>
                    </div>

                    {/* Cena końcowa */}
                    <div className="mb-3">
                        <h5>Total Price: ${calculateTotalPrice()}</h5>
                    </div>

                    {/* Przycisk potwierdzenia zamówienia */}
                    <button className="btn btn-success" onClick={handleConfirmOrder}>
                        Confirm Order
                    </button>
                </div>
            )}

            {orderConfirmed && (
                <div className="mt-4 text-center p-4 border rounded bg-light">
                    <div className="d-flex justify-content-center mb-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="64"
                            height="64"
                            fill="currentColor"
                            className="bi bi-check-circle-fill text-success"
                            viewBox="0 0 16 16"
                        >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                    </div>
                    <h4 className="mb-3">Thank you for your order!</h4>
                    <p className="lead">
                        Your order has been confirmed and will be shipped to:
                    </p>
                    <p className="font-weight-bold text-primary">{address}</p>
                    <p className="text-muted">
                        A confirmation email has been sent to <strong>{email}</strong>.
                    </p>
                    <button
                        className="btn btn-outline-primary mt-3"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}

export default CartPage;