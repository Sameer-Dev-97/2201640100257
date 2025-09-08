"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;

class Logger {
  constructor(token) {
    this.token = token;
  }

  async log(stack, level, pkg, message) {
    // Temporary: just log to console instead of posting
    const logEntry = {
      timestamp: new Date().toISOString(),
      stack,
      level,
      package: pkg,
      message,
    };
    console.log("📝 Log:", logEntry);

    // If in future you have the remote server, uncomment this:
    /*
    try {
      const res = await axios.post("http://20.244.56.144/evaluation-service/logs", {
        stack,
        level,
        package: pkg,
        message,
      }, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error("Failed to send log:", err.message);
    }
    */
  }
}

exports.Logger = Logger;
