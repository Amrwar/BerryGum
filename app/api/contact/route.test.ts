import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { POST, GET } from "./route";

function loggedOutput(spy: ReturnType<typeof vi.spyOn>): string {
  return spy.mock.calls.map((c: unknown[]) => c.join(" ")).join("\n");
}

function postContact(body: unknown) {
  const req = new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return POST(req);
}

const validPayload = {
  name: "Karim Hassan",
  email: "karim@example.com",
  message: "I would like a quote for a new restaurant website.",
};

let consoleLogSpy: ReturnType<typeof vi.spyOn>;
let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

afterEach(() => {
  consoleLogSpy.mockRestore();
  consoleErrorSpy.mockRestore();
  consoleWarnSpy.mockRestore();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("POST /api/contact", () => {
  it("accepts a valid submission with a 200 and a thank-you message", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = await postContact(validPayload);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    });
  });

  it("logs the submission to the console when no Resend API key is configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    await postContact(validPayload);
    const logged = loggedOutput(consoleLogSpy);
    expect(logged).toContain("NEW CONTACT FORM SUBMISSION");
    expect(logged).toContain("Karim Hassan");
    expect(logged).toContain("karim@example.com");
  });

  it("rejects a name shorter than 2 characters with a 400", async () => {
    const res = await postContact({ ...validPayload, name: "K" });
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain("Name must be at least 2 characters long");
  });

  it("rejects a missing name with a 400", async () => {
    const { name, ...rest } = validPayload;
    const res = await postContact(rest);
    expect(res.status).toBe(400);
  });

  it("Trap: a name of exactly 2 characters (after trimming) is accepted", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = await postContact({ ...validPayload, name: "  Al  " });
    expect(res.status).toBe(200);
  });

  it("rejects a malformed email address with a 400", async () => {
    const res = await postContact({ ...validPayload, email: "not-an-email" });
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("Please provide a valid email address");
  });

  it("rejects a missing email with a 400", async () => {
    const { email, ...rest } = validPayload;
    const res = await postContact(rest);
    expect(res.status).toBe(400);
  });

  it("accepts an email regardless of case and normalizes it to lowercase before logging", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    await postContact({ ...validPayload, email: "Karim@EXAMPLE.com" });
    const logged = loggedOutput(consoleLogSpy);
    expect(logged).toContain("karim@example.com");
  });

  it("rejects a message shorter than 10 characters with a 400", async () => {
    const res = await postContact({ ...validPayload, message: "too short" });
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("Message must be at least 10 characters long");
  });

  it("rejects a missing message with a 400", async () => {
    const { message, ...rest } = validPayload;
    const res = await postContact(rest);
    expect(res.status).toBe(400);
  });

  it("Trap: a message of exactly 10 characters is accepted, 9 is rejected", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const ok = await postContact({ ...validPayload, message: "1234567890" });
    expect(ok.status).toBe(200);
    const bad = await postContact({ ...validPayload, message: "123456789" });
    expect(bad.status).toBe(400);
  });

  it("combines every validation failure into a single comma-joined error message", async () => {
    const res = await postContact({ name: "", email: "bad", message: "" });
    const json = await res.json();
    expect(json.error).toBe(
      "Name must be at least 2 characters long, Please provide a valid email address, Message must be at least 10 characters long"
    );
  });

  it("treats a whitespace-only name as blank and rejects it", async () => {
    const res = await postContact({ ...validPayload, name: "   " });
    expect(res.status).toBe(400);
  });

  it("accepts any phone format, since phone is optional and unvalidated", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = await postContact({ ...validPayload, phone: "not-a-real-phone-format-at-all" });
    expect(res.status).toBe(200);
  });

  it("omits phone/company/budget from the logged submission when not provided", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    await postContact(validPayload);
    const logged = loggedOutput(consoleLogSpy);
    expect(logged).not.toContain("Phone:");
    expect(logged).not.toContain("Company:");
    expect(logged).not.toContain("Budget:");
  });

  it("includes phone/company/budget in the logged submission when provided", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    await postContact({
      ...validPayload,
      phone: "+201234567890",
      company: "Acme Corp",
      budget: "$5,000+",
    });
    const logged = loggedOutput(consoleLogSpy);
    expect(logged).toContain("Phone: +201234567890");
    expect(logged).toContain("Company: Acme Corp");
    expect(logged).toContain("Budget: $5,000+");
  });

  it("returns a 400 with a generic message for malformed JSON in the request body", async () => {
    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{not valid json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toEqual({ success: false, error: "Invalid request format" });
  });

  it("Trap: sends via the Resend API when RESEND_API_KEY is configured, instead of console-logging", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key-123");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "email-1" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const res = await postContact(validPayload);
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Authorization: "Bearer test-key-123" }),
      })
    );
    const logged = loggedOutput(consoleLogSpy);
    expect(logged).not.toContain("NEW CONTACT FORM SUBMISSION");
  });

  it("Trap: falls back to console-logging the submission when the Resend API call fails, rather than losing the lead", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key-123");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: "invalid from address" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const res = await postContact(validPayload);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    const logged = loggedOutput(consoleLogSpy);
    expect(logged).toContain("NEW CONTACT FORM SUBMISSION");
    expect(consoleWarnSpy).toHaveBeenCalled();
  });

  it("Trap: still returns success and logs the submission when the Resend fetch call itself throws", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key-123");
    const fetchMock = vi.fn().mockRejectedValue(new Error("network down"));
    vi.stubGlobal("fetch", fetchMock);

    const res = await postContact(validPayload);
    expect(res.status).toBe(200);
    const logged = loggedOutput(consoleLogSpy);
    expect(logged).toContain("NEW CONTACT FORM SUBMISSION");
  });

  it("includes the caller-supplied reply_to and recipient in the Resend request payload", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key-123");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal("fetch", fetchMock);

    await postContact(validPayload);
    const callBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(callBody.reply_to).toBe("karim@example.com");
    expect(callBody.to).toEqual(["BerryGumStudio@yahoo.com"]);
    expect(callBody.subject).toContain("Karim Hassan");
  });
});

describe("GET /api/contact", () => {
  it("rejects with a 405, since only POST is supported", async () => {
    const res = await GET();
    expect(res.status).toBe(405);
    const json = await res.json();
    expect(json).toEqual({ error: "Method not allowed" });
  });
});
