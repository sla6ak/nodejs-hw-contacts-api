const express = require("express");
const { addValidation, updateValidation, validationFavorite } = require("../middlewares/contactValidation.js");
const { tokenMiddelware } = require("../middlewares/tokenMiddelware");
const router = express.Router();
const {
    getAllContacts,
    getOneContact,
    // getFavoriteContact,
    addContact,
    deletContact,
    updateContact,
    updateFavorite,
} = require("../../controllers/contacts/contacts");

router.get("/", tokenMiddelware, getAllContacts);

router.get("/:contactId", tokenMiddelware, getOneContact);

// router.get("?favorite=true", tokenMiddelware, getFavoriteContact);

router.post("/", tokenMiddelware, addValidation, addContact);

router.delete("/:contactId", tokenMiddelware, deletContact);

router.put("/:contactId", tokenMiddelware, updateValidation, updateContact);

router.patch("/:contactId", tokenMiddelware, validationFavorite, updateFavorite);

module.exports = router;

// https://localhost:5000/api/contacts/
