/**
 * Archetype MCP Server
 * HTTP-based MCP server for exposing archetype data to AI assistants
 *
 * @module server/mcp-server
 */

import { createServer, type IncomingMessage, type ServerResponse } from "http";
import { archetypeTools, type ArchetypeQueryCriteria } from "../archetype/tools.js";

/**
 * MCP Tool definition
 */
interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, unknown>;
    required?: string[];
  };
}

/**
 * Available MCP tools
 */
const TOOLS: MCPTool[] = [
  {
    name: "archetype.list",
    description: "List all available hook names with archetype definitions",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "archetype.get",
    description:
      "Get complete archetype for a hook including all 4 layers (prop rules, state mappings, variants, structure)",
    inputSchema: {
      type: "object",
      properties: {
        hookName: {
          type: "string",
          description: "Name of the hook (e.g., useButton, useTextField)",
        },
      },
      required: ["hookName"],
    },
  },
  {
    name: "archetype.getPropRules",
    description:
      "Get Layer 1 hook prop rules - maps hooks to prop objects and base styles",
    inputSchema: {
      type: "object",
      properties: {
        hookName: {
          type: "string",
          description: "Name of the hook",
        },
      },
      required: ["hookName"],
    },
  },
  {
    name: "archetype.getStateMappings",
    description:
      "Get Layer 2 state-style mappings - visual feedback rules for hook states",
    inputSchema: {
      type: "object",
      properties: {
        hookName: {
          type: "string",
          description: "Name of the hook",
        },
      },
      required: ["hookName"],
    },
  },
  {
    name: "archetype.getVariants",
    description:
      "Get Layer 3 variant branching - conditional styling based on configuration options",
    inputSchema: {
      type: "object",
      properties: {
        hookName: {
          type: "string",
          description: "Name of the hook",
        },
      },
      required: ["hookName"],
    },
  },
  {
    name: "archetype.getStructure",
    description:
      "Get Layer 4 structure templates - HTML/JSX templates and accessibility rules",
    inputSchema: {
      type: "object",
      properties: {
        hookName: {
          type: "string",
          description: "Name of the hook",
        },
      },
      required: ["hookName"],
    },
  },
  {
    name: "archetype.query",
    description: "Search archetypes by criteria (WCAG level, state name, etc.)",
    inputSchema: {
      type: "object",
      properties: {
        wcagLevel: {
          type: "string",
          enum: ["A", "AA", "AAA"],
          description: "Filter by WCAG accessibility level",
        },
        stateName: {
          type: "string",
          description: "Filter by state name (e.g., isPressed, isSelected)",
        },
        hasVariant: {
          type: "string",
          description: "Filter by variant option name (e.g., variant, size)",
        },
        propObject: {
          type: "string",
          description: "Filter by prop object name (e.g., buttonProps)",
        },
      },
    },
  },
];

/**
 * Parse JSON body from request
 */
async function parseBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

/**
 * Send JSON response
 */
function sendJSON(res: ServerResponse, status: number, data: unknown): void {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(data, null, 2));
}

/**
 * Handle tool execution
 */
async function executeTool(
  toolName: string,
  params: Record<string, unknown>,
): Promise<unknown> {
  switch (toolName) {
    case "archetype.list":
      return archetypeTools.list();

    case "archetype.get":
      return archetypeTools.get(params.hookName as string);

    case "archetype.getPropRules":
      return archetypeTools.getPropRules(params.hookName as string);

    case "archetype.getStateMappings":
      return archetypeTools.getStateMappings(params.hookName as string);

    case "archetype.getVariants":
      return archetypeTools.getVariants(params.hookName as string);

    case "archetype.getStructure":
      return archetypeTools.getStructure(params.hookName as string);

    case "archetype.query":
      return archetypeTools.query(params as ArchetypeQueryCriteria);

    default:
      return { success: false, error: `Unknown tool: ${toolName}` };
  }
}

/**
 * Request handler
 */
async function handleRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const path = url.pathname;

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  // Health check
  if (path === "/health" && req.method === "GET") {
    sendJSON(res, 200, {
      status: "ok",
      service: "studio-mcp",
      tools: TOOLS.map((t) => t.name),
    });
    return;
  }

  // List tools
  if (path === "/tools" && req.method === "GET") {
    sendJSON(res, 200, { tools: TOOLS });
    return;
  }

  // Execute tool
  if (path.startsWith("/tools/") && req.method === "POST") {
    const toolName = path.replace("/tools/", "");
    const tool = TOOLS.find((t) => t.name === toolName);

    if (!tool) {
      sendJSON(res, 404, { error: `Tool not found: ${toolName}` });
      return;
    }

    try {
      const params = (await parseBody(req)) as Record<string, unknown>;
      const result = await executeTool(toolName, params);
      sendJSON(res, 200, result);
    } catch (error) {
      sendJSON(res, 500, {
        error: error instanceof Error ? error.message : "Internal error",
      });
    }
    return;
  }

  // Not found
  sendJSON(res, 404, { error: "Not found" });
}

/**
 * Create and start MCP server
 */
export function createMCPServer(port = 3000): ReturnType<typeof createServer> {
  const server = createServer(async (req, res) => {
    try {
      await handleRequest(req, res);
    } catch (error) {
      console.error("Request error:", error);
      sendJSON(res, 500, { error: "Internal server error" });
    }
  });

  server.listen(port, () => {
    console.log(`🚀 Archetype MCP Server running at http://localhost:${port}`);
    console.log(`   Health: http://localhost:${port}/health`);
    console.log(`   Tools:  http://localhost:${port}/tools`);
  });

  return server;
}

/**
 * Export tools list for external use
 */
export { TOOLS };
