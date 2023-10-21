const mongoose = require("mongoose");

const app = require("./App");
const { DB_HOST, PORT } = process.env;
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log("Server running, port: 3001");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
