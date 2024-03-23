const express = require("express");
const morgan = require("morgan"); // for consoling api request calls
const helmet = require("helmet"); // secures connection by adding additional header
const cors = require("cors"); // handling cors errors
const ErrorHandler = require("../middlewares/error.middlewares"); // error handler for routes

//Routers
const { UserRouter } = require("../routes/users.routes");

module.exports = (app) => {
  app.use(express.json({ limit: "9999000009mb" }));
  app.use(express.urlencoded({ extended: true }));

  // Conditional middleware for development environment
  //  if (process.env.NODE_ENV !== 'production') {
  //     app.use(morgan("tiny")); // initiating console api requests
  //  }

  app.use(helmet());
  const allowedOrigins = ["https://necoleo-fe.vercel.app/", "*"]; // Add your allowed URLs here
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  app.use(cors(corsOptions));
  //start of routes
  app.use("/", UserRouter);

  // handling async errors in api routes
  app.use(ErrorHandler);
  app.get("*", (req, res) =>
    res
      .status(404)
      .send({ error: true, message: "Route not Found!", result: null })
  );
};

console.log("🛣️ Routes setup completed");
