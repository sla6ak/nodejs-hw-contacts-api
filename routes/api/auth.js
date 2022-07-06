const express = require("express");
const router = express.Router();
const { loginValidation, signupValidation } = require("../middlewares/userValidation");
const { tokenMiddelware } = require("../middlewares/tokenMiddelware");
const {
    getCurentUser,
    userLogin,
    addNewUser,
    updateSubscription,
    logOutUser,
} = require("../../controllers/users/users");

router.post("/signup", signupValidation, addNewUser);

router.post("/login", loginValidation, userLogin);

router.get("/", tokenMiddelware, getCurentUser);

router.patch("/", tokenMiddelware, updateSubscription);

router.get("/logout", tokenMiddelware, logOutUser);

module.exports = router;

// https://localhost:5000/api/auth/signup
