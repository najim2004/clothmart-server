const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const cors = require("cors");
// ---------------------routes--------------------------

const productRoutes = require("./routes/productRoutes");
const brandsNameRoutes = require("./routes/brandsNameRoutes");

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
      origin: ["http://localhost:5173", "http://localhost:5174", ,],
      credentials: true,
    })
  );
  app.use(express.json());

  // Routes
  app.use("/products", productRoutes);
  app.use("/brans-name", brandsNameRoutes);

  app.get("/", (req, res) => {
    res.send("The ClothMart server is running");
  });
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
