const express = require("express");
const router = express.Router();
const { loginValidation, signupValidation, verifyValidation } = require("../middlewares/userValidation");
const { tokenMiddelware } = require("../middlewares/tokenMiddelware");
const { upload } = require("../middlewares/filesUpload");
const user = require("../../controllers/users/users");
const ctrlWrapper = require("../helper/ctrlWrapper");

router.post("/signup", signupValidation, ctrlWrapper(user.addNewUser));

router.post("/login", loginValidation, ctrlWrapper(user.userLogin));

router.get("/", tokenMiddelware, ctrlWrapper(user.getCurentUser));

router.patch("/avatars", tokenMiddelware, upload.single("image"), ctrlWrapper(user.updateAvatar)); // single("imege") - важно указать какая часть запроса должна быть обработана миделваром по ключу в котором фронтенд отправляет файлы

router.patch("/", tokenMiddelware, ctrlWrapper(user.updateSubscription));

router.get("/logout", tokenMiddelware, ctrlWrapper(user.logOutUser));

router.get("/verify/:verificationToken", ctrlWrapper(user.verifyUser));

router.post("/verify", verifyValidation, ctrlWrapper(user.dubleVerifyUser));

module.exports = router;

// https://localhost:5000/api/auth/signup
