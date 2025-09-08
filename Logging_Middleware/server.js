// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Logger } = require("./lib/index.js"); // compiled middleware

const PORT = process.env.PORT || 5000;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

console.log("Loaded Auth Token:", AUTH_TOKEN ? "✅" : "❌ Missing");

const app = express();
app.use(express.json());
app.use(cors()); // allow requests from frontend

// Create logger instance
const logger = new Logger(AUTH_TOKEN);

// In-memory store
let urlDatabase = {};
let clickStats = {};

// Root route
app.get("/", async (req, res) => {
  await logger.log("backend", "info", "rootHandler", "Root endpoint accessed");
  res.json({ message: "Backend is running ✅" });
});

// Generate short link (Frontend will call this)
app.post("/api/shorten", async (req, res) => {
  try {
    const { longUrl, code } = req.body;
    if (!longUrl) {
      await logger.log("backend", "error", "shortenRoute", "Missing longUrl");
      return res.status(400).json({ error: "longUrl is required" });
    }

    const shortCode = code || Math.random().toString(36).substr(2, 6);
    urlDatabase[shortCode] = longUrl;

    await logger.log("backend", "info", "shortenRoute", `Created short URL for ${longUrl}`);
    res.json({
      shortCode,
      shortUrl: `http://localhost:${PORT}/${shortCode}`,
      originalUrl: longUrl
    });
  } catch (err) {
    await logger.log("backend", "fatal", "shortenRoute", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Redirect route (if accessed directly in browser)
app.get("/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const longUrl = urlDatabase[code];

    if (!longUrl) {
      await logger.log("backend", "error", "redirectRoute", `Short code ${code} not found`);
      return res.status(404).send("Not Found");
    }

    // Track clicks
    if (!clickStats[code]) clickStats[code] = [];
    clickStats[code].push({ time: new Date(), ua: req.headers["user-agent"] });

    await logger.log("backend", "info", "redirectRoute", `Redirected ${code} → ${longUrl}`);
    res.redirect(longUrl); // browser users get redirected
  } catch (err) {
    await logger.log("backend", "fatal", "redirectRoute", err.message);
    res.status(500).send("Internal Server Error");
  }
});

// Stats route (Frontend will call this)
app.get("/api/stats/:code", async (req, res) => {
  try {
    const code = req.params.code;
    if (!urlDatabase[code]) {
      await logger.log("backend", "error", "statsRoute", `Stats requested for missing code ${code}`);
      return res.status(404).json({ error: "Not Found" });
    }

    await logger.log("backend", "info", "statsRoute", `Stats requested for code ${code}`);
    res.json({
      shortCode: code,
      shortUrl: `http://localhost:${PORT}/${code}`,
      originalUrl: urlDatabase[code],
      clicks: clickStats[code] || []
    });
  } catch (err) {
    await logger.log("backend", "fatal", "statsRoute", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
