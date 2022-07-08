const express = require("express");
const router = express.Router();
const { loginValidation, signupValidation } = require("../middlewares/userValidation");
const { tokenMiddelware } = require("../middlewares/tokenMiddelware");
const { upload } = require("../middlewares/filesUpload");
const user = require("../../controllers/users/users");

router.post("/signup", signupValidation, user.addNewUser);

router.post("/login", loginValidation, user.userLogin);

router.get("/", tokenMiddelware, user.getCurentUser);

router.patch("/avatars", tokenMiddelware, upload.single("image"), user.updateAvatar); // single("imege") - важно указать какая часть запроса должна быть обработана миделваром по ключу в котором фронтенд отправляет файлы

router.patch("/", tokenMiddelware, user.updateSubscription);

router.get("/logout", tokenMiddelware, user.logOutUser);

module.exports = router;

// https://localhost:5000/api/auth/signup
