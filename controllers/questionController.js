const Question = require("../model/questionModel");

exports.askQuestion = async (req, res) => {
  // get name of person and his question
  const { name, question } = req.body;

  // validation
  if (!name || !question) {
    return res.status(400).json({
      success: false,
      error: "Name and Question are required",
    });
  }

  try {
    const newQuestion = new Question({
      name,
      question,
    });
    const postQuestion = await newQuestion.save();

    // if successful send message
    if (postQuestion) {
      return res.status(200).json({
        success: true,
        message: "Question posted successfully",
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

exports.answerQuestion = async (req, res) => {
  const { name, answer } = req.body;
  const { id } = req.params;

  // validation
  if (!name || !answer) {
    return res.status(400).json({
      success: false,
      error: "Name and Answer are required",
    });
  }
  try {
    await Question.findByIdAndUpdate(
      id,
      {
        $push: {
          answers: {
            name,
            answer,
          },
        },
      },
      (error, success) => {
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
          message: "Your answer have been recorded successfully",
          response: success,
        });
      },
    );
    // if error
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

exports.getAllQuestions = async (req, res) => {
  try {
    await Question.find({}, (error, questions) => {
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
        questions,
      });
    });
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

exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    await Question.findByIdAndRemove(id, (error, success) => {
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
        message: "Question deleted successfully",
        response: success,
      });
    });
    // if error
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
