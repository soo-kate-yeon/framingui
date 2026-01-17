/**
 * Server Entry Point
 * Starts the Archetype MCP server
 *
 * @module server
 */

import { createMCPServer, TOOLS } from "./mcp-server.js";
import type { Server } from "http";

// Get port from environment or use default
const PORT = parseInt(process.env.MCP_PORT || "3000", 10);

// Start server
const server: Server = createMCPServer(PORT);

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n⏹️  Shutting down MCP server...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("\n⏹️  Shutting down MCP server...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});

export { server, TOOLS };
