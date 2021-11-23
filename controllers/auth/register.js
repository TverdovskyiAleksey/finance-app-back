const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
// const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');
// const { sendEmail } = require('../../helpers');
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Already registered');
  }
  const token = jwt.sign(payload, SECRET_KEY);
  const avatarURL = gravatar.url(email);
  // const verifyToken = nanoid();
  const newUser = new User({
    name,
    email,
    avatarURL,
    // verifyToken,
  });
  newUser.setPassword(password);
  await newUser.save();

  // const mail = {
  //   to: email,
  //   subject: 'Confirmation of registration',
  //   html: `
  //   <a target="_blank" href="http://localhost:3000/api/users/verify/${verifyToken}">Click to confirm email</a>
  //   `,
  // };

  // sendEmail(mail);
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
    data: {
      token,
      newUser,
    }
  });
};

module.exports = register;
