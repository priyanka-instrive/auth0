const service = require("./service");

const createUser = async (req, res) => {
  try {
    const auth0User = await service.createUser(req.body);
    return res.send({
      message: "User details added successfully",
      data: auth0User,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const tokens = await service.loginUser(req.body);
    return res.send({
      message: "User logged in successfully",
      data: tokens,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function refreshAccessTokenController(req, res) {
  const { refreshToken } = req.body;
  console.log("refreshToken==>>>", refreshToken);

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  try {
    const tokens = await service.createAccessTokenUsingRefreshToken(
      refreshToken
    );
    console.log("tokens==>>", tokens);
    return res.status(200).json(tokens);
  } catch (error) {
    return res.status(500).json({ error: "Failed to refresh access token" });
  }
}

module.exports = {
  createUser,
  refreshAccessTokenController,
  loginUser,
};
