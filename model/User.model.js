const { UserSchema } = require("./User.schema");

const insertUser = (userObjt) => {
  return new Promise((resolve, reject) => {
    UserSchema(userObjt)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

module.exports = { insertUser };
