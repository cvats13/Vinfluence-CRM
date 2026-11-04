const express = require("express");

const router = express.Router();

const {
  addNote,
  getNotes,
  deleteNote,
} = require("../controllers/noteController");

router.post("/", addNote);

router.get("/:clientId", getNotes);

router.delete("/:id", deleteNote);

module.exports = router;