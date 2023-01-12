const express = require("express");
const app = express();

require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const errorHandler = require("./middleware");
const userRouter = require("./routers/userRouter");
const notesRouter = require("./routers/notesRouter");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE, (err) => {
  if (err) console.log(err);
  else console.log("connected");
});
app.use(express.json());
app.use(cors());
// app.use(errorHandler);
app.use("/api/notes", notesRouter);
app.use("/api/users",userRouter)





app.listen(process.env.PORT || 5000);
