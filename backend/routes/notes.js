const express = require("express");
const fetchuser = require("../middleware/fetchUser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get All User using: GET "api/notes/getuser". login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2: Add a new Note using: POST "api/notes/addnote". login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title").isLength({ min: 3 }).withMessage("Enter a valid title"),

    body("description")
      .isLength({ min: 5 })
      .withMessage("description must be at least 5 characters long"),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // Handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await note.save();
      res.json(savedNotes);
    } catch (error) {
      console.error("Server Error:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3: Update an existing  Note using: PUT "api/notes/addnote". login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find note to be update and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4: Delete an existing  Note using: DELETE "api/notes/deletenote". login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //Allow deletion if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "This Note has been deleted", note: note });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
