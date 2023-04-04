module.exports.public = async (event) => {
  console.log("request public route ....", new Date().toISOString());
  return {
    statusCode: 200,
    body: JSON.stringify(
      [
        {
          id: 1,
          name: "flash",
          power: "speed",
        },
      ],
      null,
      2
    ),
  };
};

module.exports.private = async (event) => {
  console.log("request private route ....", new Date().toISOString());

  console.log({
    User: JSON.parse(event.requestContext.authorizer.user),
  });
  return {
    statusCode: 200,
    body: JSON.stringify(
      [
        {
          id: 100,
          name: "batman",
          power: "rich",
        },
      ],
      null,
      2
    ),
  };
};
