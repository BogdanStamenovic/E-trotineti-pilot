import { createServer } from "http";
import express from "express";
import { serveStatic } from "./static";

const app = express();
const httpServer = createServer(app);

(async () => {
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  const listenOptions: any = { port, host: "0.0.0.0" };
  if (process.platform !== "win32") listenOptions.reusePort = true;
  httpServer.listen(listenOptions, () => {
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
    });
    console.log(`${time} [express] serving on port ${port}`);
  });
})();
