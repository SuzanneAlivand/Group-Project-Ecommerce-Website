const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addOrder = async (req, res) => {
  const {
    orderItems,
    shippingAdress,
    itemsPice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("e-commerce");
    const NewOrder = await Object.assign({ _id: uuidv4() }, req.body);
    await db.collection("orders").insertOne(NewOrder);
    res.status(201).json({ status: 201, message: "New order added!" });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { addOrder };
