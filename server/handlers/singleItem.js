const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getItem = async (req, res) => {
  const _id = req.params.itemId * 1;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("e-commerce");
    const result = await db.collection("products").findOne({ _id });
    console.log(_id);

    res.status(200).json({
      status: 200,
      data: result,
    });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { getItem };
