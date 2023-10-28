const { ctrlWrapper, createError, errorType } = require("../helpers");
const { Product } = require("../models/products");
const User = require("../models/users");

const getProductsByFilter = async (req, res) => {
  const { category, search, recommended } = req.query;
  const where = {};

  if (category) {
    where.category = category;
  }
  if (search) {
    where.title = { $regex: search, $options: "i" };
  }

  if (recommended) {
    const { user: id } = req;
    const user = await User.findById(id);
    const bloodType = user.bodyParams.blood;
    if (recommended === "true") {
      where[`groupBloodNotAllowed.${bloodType}`] = true;
    } else {
      where[`groupBloodNotAllowed.${bloodType}`] = false;
    }
  }

  const products = await Product.find(where);
  if (!products) {
    throw createError(errorType.BAD_REQUEST);
  }
  res.json(products);
};

module.exports = {
  getProductsByFilter: ctrlWrapper(getProductsByFilter),
};
