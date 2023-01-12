const express = require("express");
const router = express.Router();
const c = require("../controllers/notesController");
const auth = require("../middleware");
router.route("/").get(auth,c.getAllNotes).post(auth,c.addNote);
router.route("/:id").get(auth,c.getOneNote).put(auth,c.updateNote).delete(auth,c.deleteNote);

module.exports = router;
