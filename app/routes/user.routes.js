module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", user.create);
  
    // Retrieve all Users
    router.get("/getAllUsers", user.findAll);
  
    // Retrieve a single User with id
    router.post("/:id", user.findOne);
  
    //update the access token after login
    router.put("/updateToken/", user.updateToken);

    // Update a User with id
    router.put("/:id", user.update);
  
    // Delete a User with id
    router.delete("/delete/:id", user.delete);
  
    // Create a new User
    router.delete("/", user.deleteAll);
  
    app.use("/api/user", router);
  };
  