const service = require("./service");

const createUser = async (req, res) => {
  console.log("req=>", req.body);
  try {
    const auth0User = await service.createUser(req.body);
    console.log("auth0User==>>>>", auth0User); // create new user in auth0
    return res.send({
      message: "User details added successfully",
      data: auth0User,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  console.log("req=>", req.body);
  try {
    const tokens = await service.loginUser(req.body);
    console.log("tokens==>>>>", tokens); // login the user and get tokens
    return res.send({
      message: "User logged in successfully",
      data: tokens,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};
