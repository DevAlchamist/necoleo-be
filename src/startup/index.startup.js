const { PORT } = process.env;
const express = require("express");
const morgan = require("morgan"); // for consoling api request calls
const helmet = require("helmet"); // secures connection by adding additional header
const cors = require("cors"); // handling cors errors
const ErrorHandler = require("../middlewares/error.middlewares"); // error handler for routes

//Routers
const { UserRouter } = require("../routes/users.routes");

module.exports = async (app) => {
  await require("./db.startup")(app); // initiate db connection
  require("./routes.startup")(app); // initiate routes
  require("./error.startup")(app); // initiate error handlers

  //Starting Server
  app.listen(PORT || 53321, () => {
    console.log("🚀 Server is Running on PORT =>", PORT || 53321);
  });
};

console.log("🛣️ Routes setup completed");
