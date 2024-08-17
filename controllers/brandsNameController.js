exports.getBrandsName = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const brand = await db.collection("allbrands").find().toArray();
    if (!brand) {
      return res.status(404).send({ msg: "Brand not found" });
    }
    res.send(brand);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server error", err });
  }
};
