require("dotenv").config();
const axios = require("axios");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Lead = require("./models/lead");

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- TEST ROUTE ---------------- */

app.get("/", (req, res) => {
  res.send("API is running...");
});

/* ---------------- SUBSCRIBE ROUTE ---------------- */

const Subscriber = mongoose.model(
  "Subscriber",
  new mongoose.Schema({
    email: {
      type: String,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  })
);

app.post("/api/subscribe", async (req, res) => {

  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }

    const exists = await Subscriber.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Already subscribed",
      });
    }

    await Subscriber.create({ email });

    res.json({
      success: true,
      message: "Subscribed successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* ---------------- QUOTE ROUTE ---------------- */

app.post("/api/quote", async (req, res) => {

  try {

    const lead = await Lead.create(req.body);

    res.status(201).json({
      success: true,
      message: "Quote submitted successfully",
      lead,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* ---------------- DATABASE CONNECTION ---------------- */

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});