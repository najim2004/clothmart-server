exports.getProducts = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { page = 1, limit = 12, search = "", filters = {} } = req.query;
    const { brand, category, priceRange = [], sort = "date-desc" } = filters;

    const skip = (page - 1) * limit;
    const query = {};
    // Apply search query
    if (search) {
      query.productName = { $regex: search, $options: "i" };
    }

    // Apply filters
    if (category) {
      query.category = category;
    }
    if (brand) {
      query.brand = brand;
    }
    if (priceRange[0] || priceRange[1]) {
      query.price = {};
      if (priceRange[0]) query.price.$gte = parseFloat(priceRange[0]);
      if (priceRange[1]) query.price.$lte = parseFloat(priceRange[1]);
    }
    // Determine sorting
    const sortOption =
      sort === "price-asc"
        ? { price: 1 }
        : sort === "price-desc"
        ? { price: -1 }
        : sort === "date-asc"
        ? { creationDate: 1 }
        : { creationDate: -1 };

    // Fetch products with pagination and sorting
    const totalProducts = await db
      .collection("allproducts")
      .countDocuments(query);
    const products = await db
      .collection("allproducts")
      .find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort(sortOption)
      .toArray();

    res.status(200).send({ totalProducts, products });
  } catch (error) {
    res.status(500).send({ message: "Error fetching products", error });
  }
};
