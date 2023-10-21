const mongoose = require("mongoose");

const app = require("./App");
const { DB_HOST, PORT = 3001 } = process.env;
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connect successfully");
    app.listen(3001);
  })
  .catch((error) => {
    console.log(error.message);
    proccess.exit(1);
  });
