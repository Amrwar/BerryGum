import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { POST, GET } from "./route";

function loggedOutput(spy: ReturnType<typeof vi.spyOn>): string {
  return spy.mock.calls.map((c: unknown[]) => c.join(" ")).join("\n");
}

function postConsultation(body: unknown) {
  const req = new NextRequest("http://localhost/api/consultation", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return POST(req);
}

const validPayload = {
  name: "Karim Hassan",
  email: "karim@example.com",
  topic: "I'd like to discuss a booking system for my clinic.",
  dateKey: "2026-08-10",
  time: "9:00 AM",
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

describe("POST /api/consultation", () => {
  it("accepts a valid submission with a 200 and a confirmation message", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = await postConsultation(validPayload);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ success: true, message: "Thanks! We'll confirm your slot shortly." });
  });

  it("logs the submission to the console when no Resend API key is configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    await postConsultation(validPayload);
    const logged = loggedOutput(consoleLogSpy);
    expect(logged).toContain("NEW CONSULTATION REQUEST");
    expect(logged).toContain("Karim Hassan");
    expect(logged).toContain("2026-08-10 at 9:00 AM");
  });

  it("rejects a name shorter than 2 characters with a 400", async () => {
    const res = await postConsultation({ ...validPayload, name: "K" });
    expect(res.status).toBe(400);
  });

  it("Trap: a topic of exactly 5 characters is accepted, 4 is rejected", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const ok = await postConsultation({ ...validPayload, topic: "12345" });
    expect(ok.status).toBe(200);
    const bad = await postConsultation({ ...validPayload, topic: "1234" });
    expect(bad.status).toBe(400);
  });

  it("rejects a missing dateKey or time with a 400", async () => {
    const { dateKey, ...withoutDate } = validPayload;
    expect((await postConsultation(withoutDate)).status).toBe(400);
    const { time, ...withoutTime } = validPayload;
    expect((await postConsultation(withoutTime)).status).toBe(400);
  });

  it("rejects a malformed email with a 400", async () => {
    const res = await postConsultation({ ...validPayload, email: "not-an-email" });
    expect(res.status).toBe(400);
  });

  it("accepts a missing phone, since it's optional", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const { phone, ...withoutPhone } = { ...validPayload, phone: undefined };
    void phone;
    const res = await postConsultation(withoutPhone);
    expect(res.status).toBe(200);
  });

  it("includes the phone in the logged submission when provided", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    await postConsultation({ ...validPayload, phone: "+201234567890" });
    const logged = loggedOutput(consoleLogSpy);
    expect(logged).toContain("Phone: +201234567890");
  });

  it("returns a 400 with a generic message for malformed JSON", async () => {
    const req = new NextRequest("http://localhost/api/consultation", {
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
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: "email-1" }) });
    vi.stubGlobal("fetch", fetchMock);

    const res = await postConsultation(validPayload);
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const logged = loggedOutput(consoleLogSpy);
    expect(logged).not.toContain("NEW CONSULTATION REQUEST");
  });

  it("Trap: falls back to console-logging when the Resend API call fails", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key-123");
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, json: async () => ({ message: "bad" }) });
    vi.stubGlobal("fetch", fetchMock);

    const res = await postConsultation(validPayload);
    expect(res.status).toBe(200);
    const logged = loggedOutput(consoleLogSpy);
    expect(logged).toContain("NEW CONSULTATION REQUEST");
    expect(consoleWarnSpy).toHaveBeenCalled();
  });

  it("Trap: still returns success and logs the submission when the Resend fetch call throws", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key-123");
    const fetchMock = vi.fn().mockRejectedValue(new Error("network down"));
    vi.stubGlobal("fetch", fetchMock);

    const res = await postConsultation(validPayload);
    expect(res.status).toBe(200);
    const logged = loggedOutput(consoleLogSpy);
    expect(logged).toContain("NEW CONSULTATION REQUEST");
  });

  it("includes the requested slot and reply_to in the Resend request payload", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key-123");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal("fetch", fetchMock);

    await postConsultation(validPayload);
    const callBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(callBody.reply_to).toBe("karim@example.com");
    expect(callBody.subject).toContain("2026-08-10");
    expect(callBody.subject).toContain("9:00 AM");
  });
});

describe("GET /api/consultation", () => {
  it("rejects with a 405, since only POST is supported", async () => {
    const res = await GET();
    expect(res.status).toBe(405);
  });
});
