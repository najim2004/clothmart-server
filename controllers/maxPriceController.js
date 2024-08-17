exports.getMaxPrice = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const result = await db
      .collection("allproducts")
      .aggregate([{ $group: { _id: null, maxPrice: { $max: "$price" } } }])
      .toArray();

    if (result.length === 0) {
      return res.status(404).send({ msg: "No products found" });
    }

    res.send({ maxPrice: result[0].maxPrice });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server error", err });
  }
};
