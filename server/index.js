"use strict";

const express = require("express");
const morgan = require("morgan");

// importing handlers
const { getAllItems } = require("./handlers/allItems");
const { getItem } = require("./handlers/singleItem");
const { register } = require("./handlers/register");
const { login } = require("./handlers/login");
const { addOrder } = require("./handlers/addOrder");

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

  // CART-Purchase items //
  // Add an item to the cart
  // .post("/api/add-cart", addItemToCart)
  // // Get all items from a cart
  // .get("/api/cart/:cartId", getCart)
  // // Get item's information from a cart
  // .get("/api/cart/:itemId", getItemCart)
  // // Update an item in the cart
  // .patch("/api/update-cart/:itemId", updateItemToCart)
  // // Delete an item from the cart
  // .delete("/api/delete-cart/:itemId", deleteItemToCart)
  // // Delete the cart and all items inside
  // .delete("/api/delete-cart", deleteCart)

  // ///****************************** *//
  // //STRETCH GOAL : USERS
  // .get("/api/users", getAllUsers) // Get all users
  // .get("/api/user/:userId", getUser) // Get 1 user by id
  // .get("/api/all-cart", getAllCart) //Get AllCart if multiple users

  //STRETCH GOAL : FILTERS
  // .get("/api/categories/list", getCategories) // Get an array of all categories
  // .get("/api/items/:category", getItemsByCategory) //Get all items by category
  // .get("/api/items/:companyId", getItemsByCompany) //Get all items for a company
  // .get("/api/companies/:companyId", getCompanyById) // Get companies by Id

  ///****************************** *//

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
