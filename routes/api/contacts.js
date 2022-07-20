const express = require("express");
const { addValidation, updateValidation, validationFavorite } = require("../middlewares/contactValidation.js");
const { tokenMiddelware } = require("../middlewares/tokenMiddelware");
const router = express.Router();
const contact = require("../../controllers/contacts/contacts");
const ctrlWrapper = require("../helper/ctrlWrapper");

router.get("/", tokenMiddelware, ctrlWrapper(contact.getAllContacts));

router.get("/:contactId", tokenMiddelware, ctrlWrapper(contact.getOneContact));

router.post("/", tokenMiddelware, addValidation, ctrlWrapper(contact.addContact));

router.delete("/:contactId", tokenMiddelware, ctrlWrapper(contact.deletContact));

router.put("/:contactId", tokenMiddelware, updateValidation, ctrlWrapper(contact.updateContact));

router.get("/:contactId/favorite", tokenMiddelware, ctrlWrapper(contact.getFavoriteContact));

router.patch("/:contactId/favorite", tokenMiddelware, validationFavorite, ctrlWrapper(contact.updateFavorite));

module.exports = router;

// https://localhost:5000/api/contacts/
