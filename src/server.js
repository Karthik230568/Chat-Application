const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());
app.use("/messages", require("./routes/messages"));
app.use("/conversations", require("./routes/conversations"));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
