import {useEffect, useState} from "react";

function PlacedOrdersPage() {
    const token = localStorage.getItem("token");
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h2>Placed Orders</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <p>Order Date: {order.date}</p>
                        <p>Order Total Price: {order.totalPrice}</p>
                        <p>Order Status: {order.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlacedOrdersPage;