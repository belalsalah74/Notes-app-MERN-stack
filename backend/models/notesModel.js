const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      minlength: 5,
      required: [true, "This field is required"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
