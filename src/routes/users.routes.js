const express = require("express");
const { UserController } = require("../controllers/user.controllers");
const { Auth } = require("../middlewares/auth.middlewares");
const router = express.Router();

//get requests
router.get("/", UserController.getAllCards);
router.post("/", UserController.createNewCard);
router.patch("/update/:id", UserController.editCurrentCard);
router.delete("/delete/:id", UserController.deleteCurrentCard);
//put requests

module.exports.UserRouter = router;
