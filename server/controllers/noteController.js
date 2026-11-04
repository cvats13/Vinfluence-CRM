const Note = require("../models/Note");

// Add Note
const addNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);

    res.status(201).json({
      message: "Note Added Successfully",
      note,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// Get Notes of Client
const getNotes = async (req, res) => {
  try {

    const notes = await Note.find({
      clientId: req.params.clientId,
    }).sort({ createdAt: -1 });

    res.status(200).json(notes);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// Delete Note
const deleteNote = async (req, res) => {
  try {

    await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Note Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  addNote,
  getNotes,
  deleteNote,
};