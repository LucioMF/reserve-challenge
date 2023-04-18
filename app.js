const express = require("express");
const app = express();
const database = require("./database/database");
const clientRouter = require("./routes/ClientRoutes");
const memberRouter = require("./routes/MemberRoutes");

app.use(express.json());

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

database;

app.use("/api/clients", clientRouter);
app.use("/api/members", memberRouter);

module.exports = app;
