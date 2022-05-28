const items = require("./data/items.json");
const companies = require("./data/companies.json");
const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  for (const obj of items) {
    obj.price = parseFloat(obj.price.replace("$", ""));
  }
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("e-commerce");
    db.collection("products").insertMany(items);
    await db.collection("companies").insertMany(companies);
    client.close();
  } catch (err) {
    console.log(err.message);
  }
};
batchImport();
