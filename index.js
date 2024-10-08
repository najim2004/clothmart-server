const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const cors = require("cors");
// ---------------------routes--------------------------

const productRoutes = require("./routes/productRoutes");
const brandsNameRoutes = require("./routes/brandsNameRoutes");
const allCategoriesRoutes = require("./routes/allCategoriesRoutes");
const maxPriceRoutes = require("./routes/maxPriceRoutes");

// ---------------------routes--------------------------

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const startServer = async () => {
  const db = await connectDB();
  app.locals.db = db;

  // Global Middleware
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://krist-603ca.web.app",
      ],
      credentials: true,
    })
  );
  app.use(express.json());

  // Routes
  app.use("/products", productRoutes);
  app.use("/all-brans-name", brandsNameRoutes);
  app.use("/all-categories", allCategoriesRoutes);
  app.use("/max-price", maxPriceRoutes);

  app.get("/", (req, res) => {
    res.send("The ClothMart server is running");
  });
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
