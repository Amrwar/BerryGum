import { describe, it, expect } from "vitest";
import { validateContactForm } from "./contactSchema";

const valid = {
  name: "Karim Hassan",
  email: "karim@example.com",
  message: "I would like a quote for a new restaurant website.",
};

describe("validateContactForm", () => {
  it("accepts a fully valid payload", () => {
    const result = validateContactForm(valid);
    expect(result.success).toBe(true);
  });

  it("trims and lowercases the email in the returned data", () => {
    const result = validateContactForm({ ...valid, email: "  Karim@EXAMPLE.com  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("karim@example.com");
    }
  });

  it("rejects a name shorter than 2 characters, with the exact message the API route promises", () => {
    const result = validateContactForm({ ...valid, name: "K" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.name).toBe("Name must be at least 2 characters long");
    }
  });

  it("Trap: a whitespace-only name is trimmed to empty and rejected, not accepted as 'non-empty'", () => {
    const result = validateContactForm({ ...valid, name: "   " });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.name).toBeDefined();
    }
  });

  it("rejects a malformed email with the exact message the API route promises", () => {
    const result = validateContactForm({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.email).toBe("Please provide a valid email address");
    }
  });

  it("rejects an empty email string, not just a missing field", () => {
    const result = validateContactForm({ ...valid, email: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a message shorter than 10 characters with the exact message the API route promises", () => {
    const result = validateContactForm({ ...valid, message: "too short" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.message).toBe("Message must be at least 10 characters long");
    }
  });

  it("Trap: a message of exactly 10 characters is accepted, 9 is rejected", () => {
    expect(validateContactForm({ ...valid, message: "1234567890" }).success).toBe(true);
    expect(validateContactForm({ ...valid, message: "123456789" }).success).toBe(false);
  });

  it("treats phone, company, and budget as fully optional", () => {
    const result = validateContactForm(valid);
    expect(result.success).toBe(true);
  });

  it("accepts any non-empty phone format, since phone is intentionally unvalidated beyond presence", () => {
    const result = validateContactForm({ ...valid, phone: "not a real phone format" });
    expect(result.success).toBe(true);
  });

  it("collects one error per invalid field, not just the first failure", () => {
    const result = validateContactForm({ name: "", email: "bad", message: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(result.fieldErrors).sort()).toEqual(["email", "message", "name"]);
      expect(result.errors).toHaveLength(3);
    }
  });

  it("rejects a completely empty object", () => {
    expect(validateContactForm({}).success).toBe(false);
  });

  it("rejects non-object input without throwing", () => {
    expect(validateContactForm(null).success).toBe(false);
    expect(validateContactForm("a string").success).toBe(false);
    expect(validateContactForm(undefined).success).toBe(false);
  });
});
