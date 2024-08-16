exports.getProducts = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const {
      page = 1,
      limit = 12,
      search = "",
      filters = {},
      sort = "price-asc",
    } = req.query;
    const skip = (page - 1) * limit;
    const query = {};

    // Apply search query
    if (search) {
      query.productName = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    // Apply filters
    if (filters.category) {
      query.category = filters.category;
    }
    if (filters.brand) {
      query.brand = filters.brand;
    }
    if (filters.priceRange[0] || filters.priceRange[1]) {
      query.price = {};
      if (filters.priceRange[0])
        query.price.$gte = parseFloat(filters.priceRange[0]);
      if (filters.priceRange[1])
        query.price.$lte = parseFloat(filters.priceRange[1]);
    }

    // Determine sorting
    let sortOption;
    switch (filters.sort) {
      case "price-asc":
        sortOption = { price: 1 };
        break;
      case "price-desc":
        sortOption = { price: -1 };
        break;
      case "date-asc":
        sortOption = { creationDate: 1 };
        break;
      case "date-desc":
        sortOption = { creationDate: -1 };
        break;
      default:
        sortOption = { creationDate: -1 };
    }

    // console.log(filters);
    // console.log(query);

    // Get total count of products
    const totalProducts = await db
      .collection("allproducts")
      .countDocuments(query);

    // Fetch paginated and sorted products
    const products = await db
      .collection("allproducts")
      .find(query)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort(sortOption)
      .toArray();

    res.status(200).json({
      totalProducts,
      products,
    });
  } catch (error) {
    res.status(500).send({ message: "Error fetching products", error });
  }
};
