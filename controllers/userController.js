const User = require("../model/userModel");

exports.addUser = async (req, res) => {
  const { firstName, lastName, email, location } = req.body;

  // validation
  if (!firstName || !lastName || !location || !email) {
    return res.status(400).json({
      success: false,
      error: "All fields are required",
    });
  }

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      location,
    });

    const postUser = await newUser.save();

    // if successful send message
    if (postUser) {
      return res.status(200).json({
        success: true,
        message: "User added successfully",
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

exports.getUser = async (req, res) => {
  try {
    return await User.find({}, (error, users) => {
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
        user: users[0], // just send the first user
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

exports.updateUser = async (req, res) => {
  const { firstName, lastName, email, location } = req.body;
  const { id } = req.params;

  // reject email change
  if (email) {
    return res.status(400).json({
      success: false,
      error: "You cannot change your email address",
    });
  }

  // if no fields were specified
  if (!firstName && !lastName && !location) {
    return res.status(400).json({
      success: false,
      error: "No fields were provided",
    });
  }

  try {
    return await Question.findByIdAndUpdate(
      id,
      {
        ...req.body,
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
          message: "Your profile has been updated successfully",
          response: success,
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
