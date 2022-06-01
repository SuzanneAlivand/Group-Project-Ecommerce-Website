"use strict";

const express = require("express");
const morgan = require("morgan");

// importing handlers
const { getAllItems } = require("./handlers/allItems");
const { getItem } = require("./handlers/singleItem");
const { register } = require("./handlers/register");
const { login } = require("./handlers/login");
const { addOrder } = require("./handlers/addOrder");
const { getOrders } = require("./handlers/getOrders");

const PORT = 5000;

// this is my express server :)

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  // .get("/bacon", (req, res) => res.status(200).json("🥓"))

  // ITEMS: display all and by id //
  //Get all items and all item's information
  .get("/api/items", getAllItems)
  //Get item's information by id
  .get("/api/items/:itemId", getItem)
  // user - register
  .post("/api/user/register", register)
  // user - login
  .post("/api/user/login", login)

  // add new order
  .post("/api/orders", addOrder)

  // get order history
  .get("/api/user/:userName", getOrders)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
