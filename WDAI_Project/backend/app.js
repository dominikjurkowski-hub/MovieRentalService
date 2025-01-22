const express = require("express");
const cors = require("cors");
require("dotenv").config();

const reviewsRoutes = require("./routes/reviewsRoutes");
const usersRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Ładowanie tras
app.use("/api/reviews", reviewsRoutes);
app.use("/api/users", usersRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
