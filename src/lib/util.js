const buildIAMPolicy = (userId, effect, resources, context) => {
  const policy = {
    principalId: userId,
    policyDocument: {
      Statement: [
        {
          Action: "execute-api:Invoke",
          //Allow | Deny
          effect: effect,
          //arn
          Resource: resource,
        },
      ],
    },
    //response context
    context,
  };

  return policy;
};

module.exports = {
  buildIAMPolicy,
};
