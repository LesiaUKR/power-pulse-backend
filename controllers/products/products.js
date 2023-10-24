const { ctrlWrapper, createError, errorType } = require("../../helpers");
const { Product } = require("../../models/products");

const getAllProducts = async (req, res) => {
  console.log(req);
  const products = await Product.find();

  if (!products) {
    throw createError(errorType.BAD_REQUEST);
  }

  res.json(products);
};

module.exports = {
  getAllProducts: ctrlWrapper(getAllProducts),
};
