require("dotenv").config();

//express Framework
const express = require("express");
const app = express();
app.use(express.json());

//parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable All CORS Requests for now
const cors = require("cors");
app.use(cors());

// Routes
const taskRoutes = require("./api/routes/task");
app.use("/task", taskRoutes);

// setting mongoose connection while starting server
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MongoDB_URI)
  .then(() => {
    app.listen(process.env.APP_PORT, () => {
      console.log("Server up and running on PORT:", process.env.APP_PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
