const express = require("express");
const morgan = require("morgan");
const app = express();
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const dotenv = require("dotenv");
const fs = require("fs");
const cors = require("cors");
dotenv.config();

//dbconnection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Connected!"));

mongoose.connection.on("error", (err) => {
  console.log(`DB Connection Error ${err.message}`);
});

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
//apiDOCS
app.get("/", (req, res) => {
  fs.readFile("docs/apiDocs.json", (err, data) => {
    if (err) {
      res.status(400).json({
        error: err,
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

const myOwnMiddleware = (req, res, next) => {
  console.log("middlewarew applied");
  next();
};

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(myOwnMiddleware);
app.use(cookieParser());
app.use(cors());
///pp.use(express.json());
//app.use(express.urlencoded({ extended: false }));

app.use(expressValidator());

app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    // user is unauthorized
    res.status(401).json({ error: err });
  } else {
    next(err);
  }
});

app.use("/", postRoutes);
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`A Node JS API is listning on port ${port}`);
});
