const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const { buildIAMPolicy } = require("./lib/util");

const myRoles = {
  "heroes:list": "private",
};

const authorizeUser = (userScopes, methodArn) => {
  return userScopes.find((scope) => methodArn.indexOf(myRoles[scope]));
};

exports.handler = async (event) => {
  const token = event.authorizationToken;

  try {
    const decodeUser = jwt.verify(token, JWT_KEY);

    const user = decodeUser.user;
    const userId = user.username;
    const isAllowed = authorizeUser(user.scopes, event.methodArn);

    const authorizerContext = {
      user: JSON.stringify(user),
    };

    const policyDocument = buildIAMPolicy(
      userId,
      isAllowed ? "Allow" : "Deny",
      event.methodArn,
      authorizerContext
    );

    return policyDocument;
  } catch (error) {
    return {
      statusCode: 401,
      body: "Unauthorized",
    };
  }
};
