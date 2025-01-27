import Cart from '../models/Cart.js';

export const addToCart = async (req, res) => {
    const { userId } = req.user;
    const { movie } = req.body;

    try {
        // Calculate the price
        const price = (12 + 2 * Math.log(movie.id) + 4 * Math.sin(movie.id)) / 4;
        movie.price = price; // Attach the price to the movie object

        const cartId = await Cart.addToCart(userId, movie);
        res.status(201).json({ message: 'Movie added to cart', cartId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getCart = async (req, res) => {
    const { userId } = req.user;

    try {
        const cartItems = await Cart.getCart(userId);
        res.json(cartItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const removeFromCart = async (req, res) => {
    const { userId } = req.user;
    const { movieId } = req.params;

    try {
        await Cart.removeFromCart(userId, movieId);
        res.json({ message: 'Movie removed from cart' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

