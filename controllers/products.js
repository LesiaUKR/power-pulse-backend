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
    if (!bloodType) {
      console.log("No information about your blood type");
    }

    if (recommended === "true") {
      where[`groupBloodNotAllowed.${bloodType}`] = true;
    } else {
      where[`groupBloodNotAllowed.${bloodType}`] = false;
    }
  }
  const { page = 1, limit = 50 } = req.query;
  const total = await Product.find(where).count();
  const products = await Product.find(where).limit(limit).skip(limit*(page-1));
  if (!products) {
    throw createError(errorType.BAD_REQUEST);
  }
  
  res.json({
    total,
    page,
    limit,
    products
  });
};

module.exports = {
  getProductsByFilter: ctrlWrapper(getProductsByFilter),
};
