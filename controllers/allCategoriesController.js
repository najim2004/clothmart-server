exports.getCategories = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const categories = await db.collection("allcategories").find().toArray();
    res.send(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server Error", error: err });
  }
};
