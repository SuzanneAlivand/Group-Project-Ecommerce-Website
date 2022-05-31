const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const CryptoJs = require("crypto-js");
const path = require("path");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const register = async (req, res) => {
  const { userName, email, password, secondPassword } = req.body;
  // password encryption
  const user = {
    email: req.body.email,
    userName: req.body.userName,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  };

  if (!userName || !email || !password || !secondPassword) {
    return res.status(400).json({
      status: 400,
      message: "Please provide your information!",
    });
  } else if (password.length < 6) {
    return res.status(400).json({
      status: 400,
      message: "Password must be at least 6 characters long!",
    });
  } else if (password !== secondPassword) {
    return res.status(400).json({
      status: 400,
      message: "Password and confirm password does not match!",
    });
  } else {
    try {
      const client = new MongoClient(MONGO_URI, options);
      await client.connect();
      const db = client.db("e-commerce");
      const result = await db.collection("users").findOne({ email });
      console.log(result);
      if (result) {
        res
          .status(400)
          .json({ status: 400, message: "This email already exist!" });
      } else {
        const NewUser = Object.assign({ _id: uuidv4() }, user);
        await db.collection("users").insertOne(NewUser);
        res.status(201).json({ status: 201, message: "New user added!" });
        client.close();
      }
    } catch (err) {
      res.status(500).json({ status: 500, message: err.message });
    }
  }
};

module.exports = { register };
