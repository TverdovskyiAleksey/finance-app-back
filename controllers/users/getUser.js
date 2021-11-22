const { User } = require("../../models");

const getUser = async (req, res) => {
  const { token } = req.user;
  const { name, email, avatarURL } = await User.findOne({ token });

  res.json({
    status: "success",
    code: 200,
    data: {
      name,
      email,
      avatarURL,
      token,
    },
  });
};

module.exports = getUser;
