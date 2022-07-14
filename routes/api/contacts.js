const express = require("express");
const { addValidation, updateValidation, validationFavorite } = require("../middlewares/contactValidation.js");
const { tokenMiddelware } = require("../middlewares/tokenMiddelware");
const router = express.Router();
const contact = require("../../controllers/contacts/contacts");

router.get("/", tokenMiddelware, contact.getAllContacts);

router.get("/:contactId", tokenMiddelware, contact.getOneContact);

// router.get("/:contactId/favorite", tokenMiddelware, getFavoriteContact);

router.post("/", tokenMiddelware, addValidation, contact.addContact);

router.delete("/:contactId", tokenMiddelware, contact.deletContact);

router.put("/:contactId", tokenMiddelware, updateValidation, contact.updateContact);

router.patch("/:contactId/favorite", tokenMiddelware, validationFavorite, contact.updateFavorite);

module.exports = router;

// https://localhost:5000/api/contacts/
