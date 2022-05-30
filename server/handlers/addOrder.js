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
  console.log("req.body", req.body);
  const { cart } = req.body;
  // first we take the id and qty of each order
  const itemsId = cart.map((x) => {
    return { id: x._id, qty: x.qty };
  });
  console.log(itemsId);

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("e-commerce");
    const NewOrder = await Object.assign({ _id: uuidv4() }, req.body);
    await db.collection("orders").insertOne(NewOrder);
    // we change the numInStock of the product in db, new numInStock=previous numInStock - qty
    //
    const findItems = itemsId.map((x) => {
      db.collection("products").updateOne(
        { _id: x.id },
        { $inc: { numInStock: -x.qty } }
      );
    });

    db.collection("products").findOne({ _id });
    res.status(201).json({ status: 201, message: "New order added!" });
    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { addOrder };
