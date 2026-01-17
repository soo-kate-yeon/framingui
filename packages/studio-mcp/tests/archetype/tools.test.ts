import { describe, it, expect, beforeAll } from "vitest";
import { ArchetypeTools } from "../../src/archetype/tools.js";

describe("ArchetypeTools", () => {
  let tools: ArchetypeTools;

  beforeAll(async () => {
    tools = new ArchetypeTools();
    await tools.initialize();
  });

  describe("list", () => {
    it("should return a list of hook names", async () => {
      const result = await tools.list();

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);
    });

    it("should include common hooks like useButton", async () => {
      const result = await tools.list();

      expect(result.data).toContain("useButton");
    });
  });

  describe("get", () => {
    it("should return complete archetype for existing hook", async () => {
      const result = await tools.get("useButton");

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data!.hookName).toBe("useButton");
    });

    it("should return error for non-existent hook", async () => {
      const result = await tools.get("useNonExistent");

      expect(result.success).toBe(false);
      expect(result.error).toContain("not found");
    });

    it("should include all 4 layers when available", async () => {
      const result = await tools.get("useButton");

      expect(result.data).toHaveProperty("propRules");
      expect(result.data).toHaveProperty("stateMappings");
      expect(result.data).toHaveProperty("variants");
      expect(result.data).toHaveProperty("structure");
    });
  });

  describe("getPropRules", () => {
    it("should return prop rules for existing hook", async () => {
      const result = await tools.getPropRules("useButton");

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data!.hookName).toBe("useButton");
      expect(result.data!.propObjects).toBeDefined();
      expect(result.data!.baseStyles).toBeDefined();
    });

    it("should return error for non-existent hook", async () => {
      const result = await tools.getPropRules("useNonExistent");

      expect(result.success).toBe(false);
      expect(result.error).toContain("not found");
    });
  });

  describe("getStateMappings", () => {
    it("should return state mappings for existing hook", async () => {
      const result = await tools.getStateMappings("useButton");

      if (result.success) {
        expect(result.data!.hookName).toBe("useButton");
        expect(result.data!.states).toBeDefined();
        expect(result.data!.transitions).toBeDefined();
      }
    });
  });

  describe("getVariants", () => {
    it("should return variants for existing hook", async () => {
      const result = await tools.getVariants("useButton");

      if (result.success) {
        expect(result.data!.hookName).toBe("useButton");
        expect(result.data!.configurationOptions).toBeDefined();
      }
    });
  });

  describe("getStructure", () => {
    it("should return structure template for existing hook", async () => {
      const result = await tools.getStructure("useButton");

      if (result.success) {
        expect(result.data!.hookName).toBe("useButton");
        expect(result.data!.htmlElement).toBeDefined();
        expect(result.data!.jsxPattern).toBeDefined();
        expect(result.data!.accessibility).toBeDefined();
      }
    });
  });

  describe("query", () => {
    it("should return all archetypes with empty criteria", async () => {
      const result = await tools.query({});

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);
    });

    it("should filter by WCAG level when specified", async () => {
      const result = await tools.query({ wcagLevel: "AA" });

      expect(result.success).toBe(true);
      if (result.data!.length > 0) {
        result.data!.forEach((archetype) => {
          if (archetype.structure) {
            expect(archetype.structure.accessibility.wcagLevel).toBe("AA");
          }
        });
      }
    });

    it("should filter by prop object when specified", async () => {
      const result = await tools.query({ propObject: "buttonProps" });

      expect(result.success).toBe(true);
      if (result.data!.length > 0) {
        result.data!.forEach((archetype) => {
          if (archetype.propRules) {
            expect(archetype.propRules.propObjects).toContain("buttonProps");
          }
        });
      }
    });
  });

  describe("getAllPropRules", () => {
    it("should return all prop rules", async () => {
      const result = await tools.getAllPropRules();

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });
  });

  describe("getAllStateMappings", () => {
    it("should return all state mappings", async () => {
      const result = await tools.getAllStateMappings();

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });
  });

  describe("getAllVariants", () => {
    it("should return all variants", async () => {
      const result = await tools.getAllVariants();

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });
  });

  describe("getAllStructures", () => {
    it("should return all structures", async () => {
      const result = await tools.getAllStructures();

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });
  });
});
