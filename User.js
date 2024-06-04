const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});
const userSchema = new mongoose.Schema({
  firstName: String,
  age: {
    type: Number,
    min: 16,
    max: 50,
    validate: {
      validator: (v) => v % 2 == 0, // functions run to check if the value is valid
      message: (props) => `${props.value} is not an even number `, // props contains the value
    },
  },
  email: {
    minLength: 10,
    type: String,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date().getDate(),
  },

  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User", // ref tells mongoose hey what model does this ObjectId  reference  in our case we referencing user model; because it will refer to another person in our database
  },
  hobbies: [String],
  // address: {
  //   street: String,
  //   city: String,
  // },

  // or if you have complex object it's better to do this
  address: addressSchema,
});

module.exports = mongoose.model("User", userSchema);
