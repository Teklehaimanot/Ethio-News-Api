const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const corsOptions = {
  origin: [
    "http://localhost:4001",
    "http://78.47.152.86:4001",
    "http://localhost:3000",
    "https://user-management-ethio-news.vercel.app",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "x-auth"], // add any other headers your client sends
};

// Apply CORS middleware globally
app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("We are on the home page");
});

app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/news", require("./routes/newsRoutes"));
app.use("/api/v1/aboutNdmc", require("./routes/aboutNdmcRoute"));

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
