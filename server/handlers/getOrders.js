const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// get all the orders of specific user
// we have useName in url, we use this url to find the email of that specific user
// then we search the orders DB to find the orders related to that specific user
const getOrders = async (req, res) => {
  const userName = req.params.userName;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("e-commerce");
    const theClient = await db.collection("users").findOne({ userName });
    const clientEmail = theClient.email;
    var query = { email: clientEmail };
    const result = await db.collection("orders").find(query).toArray();
    res.status(200).json({
      status: 200,
      data: result,
    });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { getOrders };
