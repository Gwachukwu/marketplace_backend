const express = require("express");
const {
  addProduct,
  getStoreProducts,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", addProduct);
router.get("/:store_slug", getStoreProducts);
router.delete("/:id", deleteProduct);

module.exports = router;
