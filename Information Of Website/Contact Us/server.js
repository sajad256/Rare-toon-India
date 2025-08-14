// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// MongoDB Connection
// ===============================
mongoose
  .connect(
    "mongodb+srv://sajaddanish256:BHT3w3VbQLc7jxPk@formdb.2gkemvk.mongodb.net/raretoonsInfo?retryWrites=true&w=majority&appName=formDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB ✅ (raretoonsInfo)"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ===============================
// Schema & Model
// ===============================
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: String,
  date: { type: Date, default: Date.now },
});

// Collection name: "users"
const User = mongoose.model("users", contactSchema);

// ===============================
// API route to save form data
// ===============================
app.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject) {
      return res
        .status(400)
        .json({ error: "Name, email, and subject are required." });
    }

    const newUser = new User({ name, email, subject, message });
    await newUser.save();

    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("❌ Error saving contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ===============================
// Serve Frontend
// ===============================
// Adjust the path if your frontend files are somewhere else
app.use(express.static(path.join(__dirname, "../../")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../index.html"));
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
