const express = require("express");
const {
  addUser,
  getUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", addUser);
router.get("/", getUser);
router.patch("/:id", updateUser);

module.exports = router;
