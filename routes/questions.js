const express = require("express");
const {
  askQuestion,
  answerQuestion,
  getAllQuestions,
  deleteQuestion,
} = require("../controllers/questionController");

const router = express.Router();

router.post("/", askQuestion);
router.patch("/:id", answerQuestion);
router.get("/", getAllQuestions);
router.delete("/:id", deleteQuestion);

module.exports = router;
