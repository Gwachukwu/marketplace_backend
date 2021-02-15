const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answers: [
    {
      name: String,
      answer: String,
    },
  ],
});

module.exports = mongoose.model("question", questionSchema);
