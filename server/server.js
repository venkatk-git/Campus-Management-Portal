const mongoose = require("mongoose");
const app = require("./app.js");
const dotenv = require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 8000;

const DB = process.env.DB_LOCAL;

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
