import { describe, it, expect } from "vitest";
import { validateConsultationForm } from "./consultationSchema";

function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    name: "Karim Hassan",
    email: "karim@example.com",
    phone: "",
    topic: "I'd like to discuss a booking system for my clinic.",
    dateKey: "2026-08-10",
    time: "9:00 AM",
    ...overrides,
  };
}

describe("validateConsultationForm", () => {
  it("accepts a fully valid payload", () => {
    const result = validateConsultationForm(validPayload());
    expect(result.success).toBe(true);
  });

  it("trims and lowercases the email", () => {
    const result = validateConsultationForm(validPayload({ email: "  Karim@Example.COM  " }));
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("karim@example.com");
    }
  });

  it("Trap: rejects a name exactly 1 character long, accepts exactly 2", () => {
    expect(validateConsultationForm(validPayload({ name: "K" })).success).toBe(false);
    expect(validateConsultationForm(validPayload({ name: "Ka" })).success).toBe(true);
  });

  it("Trap: rejects a topic exactly 4 characters long, accepts exactly 5", () => {
    expect(validateConsultationForm(validPayload({ topic: "abcd" })).success).toBe(false);
    expect(validateConsultationForm(validPayload({ topic: "abcde" })).success).toBe(true);
  });

  it("rejects a malformed email", () => {
    const result = validateConsultationForm(validPayload({ email: "not-an-email" }));
    expect(result.success).toBe(false);
  });

  it("rejects a missing dateKey or time", () => {
    expect(validateConsultationForm(validPayload({ dateKey: "" })).success).toBe(false);
    expect(validateConsultationForm(validPayload({ time: "" })).success).toBe(false);
  });

  it("phone is optional and an empty string is accepted", () => {
    const result = validateConsultationForm(validPayload({ phone: "" }));
    expect(result.success).toBe(true);
  });

  it("collects one error per invalid field, not just the first", () => {
    const result = validateConsultationForm(validPayload({ name: "K", topic: "hi", dateKey: "" }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(result.fieldErrors).sort()).toEqual(["dateKey", "name", "topic"]);
    }
  });

  it("rejects a non-object payload", () => {
    expect(validateConsultationForm(null).success).toBe(false);
    expect(validateConsultationForm("not an object").success).toBe(false);
  });
});
