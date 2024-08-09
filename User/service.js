const { AuthenticationClient } = require("auth0");

// Initialize the Auth0 client
const auth0 = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN_URL,
  clientId: process.env.AUTH0_CLIENT_ID,
});

async function createUser(user) {
  try {
    console.log("Signing up a new user with Auth0");

    const response = await auth0.database.signUp({
      email: user.email,
      password: user.password,
      connection: process.env.AUTH0_CONNECTION_NAME,
      username: user.username,
    });

    console.log("Sign-up response data:", response);
    return response;
  } catch (e) {
    console.error("Error during sign-up:", e.response ? e.response.data : e);
    throw e;
  }
}

async function loginUser(user) {
  try {
    console.log("Logging in user with Auth0");

    const response = await auth0.oauth.passwordGrant({
      username: user.username,
      password: user.password,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN_URL}/api/v2/`,
      scope: "openid profile email offline_access",
      realm: "Username-Password-Authentication",
    });

    console.log("Login response data:", response);
    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      idToken: response.data.id_token,
    };
  } catch (e) {
    console.error("Error during login:", e.response ? e.response.data : e);
    throw e;
  }
}

module.exports = {
  createUser,
  loginUser,
};
