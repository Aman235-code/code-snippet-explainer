const express = require("express");
const cors = require("cors");
require("dotenv").config();

const snippetRoutes = require("./routes/snippets");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/snippets", snippetRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
