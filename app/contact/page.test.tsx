import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactPage from "./page";
import { LanguageProvider } from "@/lib/LanguageContext";
import { captureAnalyticsEvents } from "@/lib/analytics";

function renderContactPage() {
  return render(
    <LanguageProvider>
      <ContactPage />
    </LanguageProvider>
  );
}

function fillField(labelText: RegExp, value: string) {
  const field = screen.getByLabelText(labelText);
  fireEvent.change(field, { target: { value } });
  return field;
}

beforeEach(() => {
  vi.unstubAllGlobals();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ContactPage client-side validation", () => {
  it("Trap: blocks submission and shows a field error for a too-short name, without ever calling the API", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderContactPage();

    fillField(/full name/i, "K");
    fillField(/email address/i, "karim@example.com");
    fillField(/tell us about your project/i, "I would like a quote for a new website.");

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Name must be at least 2 characters long")).toBeInTheDocument();
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows a field error for an invalid email without submitting", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderContactPage();

    fillField(/full name/i, "Karim Hassan");
    fillField(/email address/i, "not-an-email");
    fillField(/tell us about your project/i, "I would like a quote for a new website.");

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Please provide a valid email address")).toBeInTheDocument();
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows a field error for a too-short message without submitting", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderContactPage();

    fillField(/full name/i, "Karim Hassan");
    fillField(/email address/i, "karim@example.com");
    fillField(/tell us about your project/i, "too short");

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Message must be at least 10 characters long")).toBeInTheDocument();
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("Trap: clears a field's error as soon as the user edits that field again, before re-submitting", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderContactPage();

    fillField(/full name/i, "K");
    fillField(/email address/i, "karim@example.com");
    fillField(/tell us about your project/i, "I would like a quote for a new website.");
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Name must be at least 2 characters long")).toBeInTheDocument();
    });

    fillField(/full name/i, "Karim");

    expect(screen.queryByText("Name must be at least 2 characters long")).not.toBeInTheDocument();
  });

  it("submits successfully once every field passes client-side validation", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: "Thank you! We will get back to you soon." }),
    });
    vi.stubGlobal("fetch", fetchMock);
    renderContactPage();

    fillField(/full name/i, "Karim Hassan");
    fillField(/email address/i, "karim@example.com");
    fillField(/tell us about your project/i, "I would like a quote for a new restaurant website.");

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("Trap: tracks a contact_form_submit analytics event only after a successful submission, not on every click", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: "Thank you!" }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const { events, restore } = captureAnalyticsEvents();

    renderContactPage();
    fillField(/full name/i, "Karim Hassan");
    fillField(/email address/i, "karim@example.com");
    fillField(/tell us about your project/i, "I would like a quote for a new website.");
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(events).toEqual(
        expect.arrayContaining([
          { name: "contact_form_submit", hasBudget: false, hasCompany: false },
        ])
      );
    });
    restore();
  });

  it("tracks a validation-reason contact_form_error event when the client-side check blocks submission", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { events, restore } = captureAnalyticsEvents();

    renderContactPage();
    fillField(/full name/i, "K");
    fillField(/email address/i, "karim@example.com");
    fillField(/tell us about your project/i, "I would like a quote for a new website.");
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(events).toContainEqual({ name: "contact_form_error", reason: "validation" });
    });
    expect(fetchMock).not.toHaveBeenCalled();
    restore();
  });

  it("tracks a whatsapp_click event from the contact-info WhatsApp link", () => {
    const { events, restore } = captureAnalyticsEvents();
    const { container } = renderContactPage();

    const whatsappLink = container.querySelector('a[href^="https://wa.me/"]');
    expect(whatsappLink).not.toBeNull();
    fireEvent.click(whatsappLink as Element);

    expect(events).toContainEqual({ name: "whatsapp_click", source: "contact_page" });
    restore();
  });

  it("marks invalid fields with aria-invalid for assistive technology", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderContactPage();

    fillField(/full name/i, "K");
    fillField(/email address/i, "karim@example.com");
    fillField(/tell us about your project/i, "I would like a quote for a new website.");
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/full name/i)).toHaveAttribute("aria-invalid", "true");
    });
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute("aria-invalid", "false");
  });
});
