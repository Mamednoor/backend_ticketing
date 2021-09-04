const { UserSchema } = require("./User.schema");

const insertUser = (userObjt) => {
  UserSchema(userObjt)
    .save()
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

module.exports = { insertUser };
