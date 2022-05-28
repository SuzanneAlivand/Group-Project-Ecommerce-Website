const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config({ path: "../.env" });
const CryptoJs = require("crypto-js");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({
      status: 400,
      message: "Please provide your information!",
    });
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("e-commerce");
    const user = await db
      .collection("users")
      .findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({
        status: 401,
        message: "The user doesn't exist!",
      });
    const password = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJs.enc.Utf8);
    if (password !== req.body.password)
      return res.status(401).json({
        status: 401,
        message: "The password is not correct",
      });
    res.status(201).json({ status: 201, message: "user is logged in!" });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { login };
