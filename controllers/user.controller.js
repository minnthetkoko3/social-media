const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.log(`User list has error`);
    return res.status(200).json({
      success: false,
      error: {
        msg: error.message,
      },
    });
  }
};

exports.signup = async (req, res, next) => {
  try {
    // get data request
    const { name, email, password, blogs } = req.body;

    // email validate
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(200).json({
        success: false,
        error: {
          msg: `User already taken`,
        },
      });
    }
    const hashpassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

    // create user and response
    const user = new User({
      name,
      email,
      password: hashpassword,
      blogs: [],
    });

    await user.save();

    return res.status(200).json({ user });
  } catch (error) {
    console.log(`User list has error`);
    return res.status(200).json({
      success: false,
      error: {
        msg: error.message,
      },
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    // get data request
    const {email, password } = req.body;

    // email validate
    const existinguser = await User.findOne({ email });
    if (!existinguser) {
      return res.status(200).json({
        success: false,
        error: {
          msg: `User already taken`,
        },
      });
    }

    // compare password
    const isPasswordCorrect = bcrypt.compare(password, existinguser.password)
    if (!isPasswordCorrect) {
        return res.status(200).json({
          success: false,
          error: {
            msg: `User already taken`,
          },
        });
      }

    return res.status(200).json({message: `Login successful`})
  } catch (error) {
    console.log(`User list has error`);
    return res.status(200).json({
      success: false,
      error: {
        msg: error.message,
      },
    });
  }
};
