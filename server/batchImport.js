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
  // changing the price to number and adding random ratings to items
  for (const obj of items) {
    obj.price = parseFloat(obj.price.replace("$", ""));
    for (const obj in items) {
      items[obj].rating = (Math.round(Math.random() * 9) + 1) / 2;
    }
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
