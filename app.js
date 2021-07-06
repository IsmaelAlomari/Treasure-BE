const express = require("express");
const items = require("./routes/items");
const userRoute = require("./routes/userRoute");

const cors = require("cors");
const app = express();
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
app.use(express.json());
app.use(cors());

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(userRoute);
app.use("/itemsList", items);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
