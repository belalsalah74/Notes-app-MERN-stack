const Note = require("../models/notesModel");
const User = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;
exports.getAllNotes = async (req, res) => {
  const pageSize = 10;
  const page = req.query.page || 1;
  const count = Math.ceil(
    (await Note.find({
      userId: ObjectId(req.user.id),
    }).count()) / pageSize
  );

  try {
    const notes = await Note.find({
      userId: ObjectId(req.user.id),
    })
      .sort("-updatedAt")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    if (!notes)
      return res.status(404).json({ status: "Failed", message: "Not found" });

    res.status(200).json({
      status: "Success",
      results: notes.length,
      count: count,
      data: notes,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.getOneNote = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await Note.findById(id);
    if (!note)
      return res.status(404).json({ status: "Failed", message: "Not found" });
    res.status(200).json({ status: "Success", data: note });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.addNote = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  const obj = {
    body: req.body.body,
    userId,
  };

  try {
    const note = new Note(obj);
    await note.save();
    res.status(201).json({ status: "Success", data: note });
  } catch (error) {
    res.status(400).send(error.errors);
  }
};

exports.updateNote = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(req.params.id);

    const note = await Note.findByIdAndUpdate(id, req.body);
    res.status(200).json({ status: "Success", data: note });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteNote = async (req, res) => {
  const id = req.params.id;
  const note = await Note.findByIdAndDelete(id);
  res.status(200).json({ status: "Success" });
};
