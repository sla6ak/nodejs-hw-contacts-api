const express = require("express");
const router = express.Router();
const { loginValidation, signupValidation } = require("../middlewares/userValidation");
const { tokenMiddelware } = require("../middlewares/tokenMiddelware");
const { getCurentUser, userLogin, addNewUser, logOutUser } = require("../../controllers/users/users");

router.post("/signup", signupValidation, addNewUser);

router.post("/login", loginValidation, userLogin);

router.get("/", tokenMiddelware, getCurentUser);

router.get("/logout", tokenMiddelware, logOutUser);

module.exports = router;
