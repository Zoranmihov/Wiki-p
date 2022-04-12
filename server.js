const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

let dbConnect = require("./dbConnect");

app.use(express.json());
app.use(cors());

// Routes
let userRoute = require("./routes/usersRoute");
let articlesRoute = require("./routes/articlesRoute");

app.use("/api/users/", userRoute);
app.use("/api/articles/", articlesRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: { message: error.message } });
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server is running on ${port}`));
