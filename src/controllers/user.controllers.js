const HttpError = require("../helpers/HttpError.helpers");
const Response = require("../helpers/Response.helpers");
const { UserService } = require("../services/user.service");

class UserController {
  createNewCard = async (req, res) => {
    const user = await UserService.create({ ...req.body });
    Response(res).status(201).body(user).send();
  };

  deleteCurrentCard = async (req, res) => {
    const user = await UserService.findByIdAndDelete(req.params.id);
    console.log(user);
    // Assuming Response is a wrapper around the Express response object
    // and you want to send a JSON response with a message
    Response(res).status(200).body(user).send();
  };

  getAllCards = async (req, res) => {
    // Use the find method without any parameters to get all documents
    const users = await UserService.find({});
    // Send the retrieved users as the response
    Response(res).status(200).body(users).send();
  };

  editCurrentCard = async (req, res) => {
    try {
      console.log(req.body);
      const user = await UserService.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      ); // Set new to true to return the updated document
      console.log("new", user);

      if (!user) {
        return Response(res).status(404).message("User not found").send();
      }

      Response(res).status(200).body(user).send();
    } catch (error) {
      console.error(error);
      HttpError(res, error.message, 500); // Assuming HttpError is a helper function to handle errors
    }
  };
}

module.exports.UserController = new UserController();
