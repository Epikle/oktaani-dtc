const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user-model');

//////////////////SIGNUP//////////////////
const signup = async (req, res, next) => {
  if (!req.userData.isAdmin) {
    return next(new HttpError('You are not allowed to add users.', 401));
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs, check your data.', 422));
  }

  const { name, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ name: name });
  } catch (error) {
    return next(new HttpError('Signup failed.', 500));
  }

  if (existingUser) {
    return next(new HttpError('User exists already.', 422));
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError('Could not created user.', 500));
  }

  const createdUser = new User({
    name,
    password: hashedPassword,
    isAdmin: false,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError('Signup failed.', 500));
  }

  res.status(201).json({ userId: createdUser.id, name: createdUser.name });
};

//////////////////LOGIN//////////////////
const login = async (req, res, next) => {
  const { name, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ name: name });
  } catch (error) {
    return next(new HttpError('Login failed.', 500));
  }

  if (!existingUser) {
    return next(new HttpError('Invalid credentials.', 403));
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    //Server side error
    return next(
      new HttpError('Could not log you in, please check your credentials.', 500)
    );
  }

  if (!isValidPassword) {
    return next(new HttpError('Invalid credentials.', 403));
  }

  let token;

  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        name: existingUser.name,
        isAdmin: existingUser.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (error) {
    return next(new HttpError('Login failed.', 500));
  }

  res.json({
    userId: existingUser.id,
    name: existingUser.name,
    token: token,
  });
};

//////////////////DELETE USER////////////
const deleteUser = async (req, res, next) => {
  if (!req.userData.isAdmin) {
    return next(new HttpError('You are not allowed to delete users.', 401));
  }

  const userId = req.params.id;

  if (req.userData.userId === userId) {
    return next(
      new HttpError('You are not allowed to delete own account.', 401)
    );
  }

  let user;

  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new HttpError('Something went wrong.', 500));
  }

  if (!user) {
    return next(new HttpError('Could not delete user.', 404));
  }

  try {
    await User.deleteOne({ _id: userId });
  } catch (error) {
    return next(new HttpError('Something went wrong.', 500));
  }

  res.status(200).json({ message: 'Deleted user.' });
};

module.exports = {
  signup,
  login,
  deleteUser,
};
