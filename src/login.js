const users = require("../db/users.json");
const { sign } = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

const login = async (event) => {
  console.log("Login invoked", new Date().toISOString(), event.body);

  const { userName, password } = JSON.parse(event.body);

  const validUser = users.find(
    (user) =>
      user.userName.toLowerCase() === userName.toLowerCase &&
      user.password === password
  );

  if (!validUser) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: "UnAuthorized",
      }),
    };
  }

  const signUser = {
    scopes: validUser.scopes,
    userName: validUser.username,
  };

  const token = sign(
    {
      user: signUser,
    },
    JWT_KEY,
    { expiresIn: "15m" }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      token,
    }),
  };
};

exports.handler = login;
