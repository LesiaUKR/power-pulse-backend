const mongoose = require("mongoose");

const app = require("./App");
const { DB_HOST, PORT = 3001 } = process.env;
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    proccess.exit(1);
  });
