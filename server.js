require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");

//connect DB
connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/Auth"));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err, Promise) => {
  console.log(`logged error ${err}`);
  server.close(() => process.exit(1));
});
