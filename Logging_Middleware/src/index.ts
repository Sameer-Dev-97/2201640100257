import axios from "axios";

interface LogPayload {
  stack: "backend" | "frontend";
  level: "info" | "error" | "fatal";
  package: string;
  message: string;
}

export class Logger {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async log(stack: LogPayload["stack"], level: LogPayload["level"], pkg: string, message: string) {
    try {
      const res = await axios.post(
        "http://20.244.56.144/evaluation-service/logs",
        {
          stack,
          level,
          package: pkg,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      return res.data;
    } catch (err: any) {
      console.error("Failed to send log:", err.message);
    }
  }
}
