const User = require("./User");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mongo_crud");

//CREATE
async function create() {
  try {
    // const user = new User({ firstName: "alice", age: 44 });
    // await user.save();

    // better way to create user
    const user = await User.create({
      firstName: "charlie",
      age: 20,
      hobbies: ["painting ", "music"],
      street: "side street 2",
      email: "example2@mail.com",
    });

    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}
create();

//READ
async function read() {
  try {
    const users = await User.findById("645c1a344dcefa5c6753c5ac");

    const user = await User.find({});
    console.log(user);

    // mongoose query
    const user2 = await User.where("age").equals(40);
    console.log(user2);

    const user3 = await User.where("firstName")
      .equals("alice")
      .populate("bestFriend")
      .select("age"); //  projection;
    console.log(user3);

    // add best friend to our user "alice"
    // user3[0].bestFriend = "645c24075a3186284c2fc890";
    // user3[0].save();

    const alice = await User.where("firstName")
      .equals("alice")
      .populate("bestFriend");

    console.log(alice);
  } catch (e) {
    console.log(e);
  }
}
read();
