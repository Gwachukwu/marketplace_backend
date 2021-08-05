const Product = require("../model/productModel");

exports.addProduct = async (req, res) => {
  const { name, title, description, image, price, store_slug } = req.body;

  // validation
  if (!name || !title || !description || !image || !store_slug || !price) {
    return res.status(400).json({
      success: false,
      error: "All fields are required",
    });
  }

  try {
    const newProduct = new Product({
      name,
      title,
      description,
      image,
      store_slug,
      price,
    });
    const postProduct = await newProduct.save();

    // if successful send message
    if (postProduct) {
      return res.status(200).json({
        success: true,
        message: "Product added successfully",
      });
    }
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getStoreProducts = async (req, res) => {
  const { store_slug } = req.params;
  try {
    return await Product.find({ store_slug }, (error, products) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          error: "Internal Server Error",
        });
      }
      // if successful
      return res.status(200).json({
        success: true,
        products,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    return await Product.findByIdAndRemove(id, (error, success) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          error: "Internal Server Error",
        });
      }
      // if successful
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        response: success,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
