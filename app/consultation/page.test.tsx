import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import ConsultationPage from "./page";
import { LanguageProvider } from "@/lib/LanguageContext";
import { captureAnalyticsEvents } from "@/lib/analytics";

function renderConsultationPage() {
  return render(
    <LanguageProvider>
      <ConsultationPage />
    </LanguageProvider>
  );
}

async function waitForSlotsToLoad() {
  await waitFor(() => {
    expect(screen.getByTestId("day-picker")).toBeInTheDocument();
  });
}

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Karim Hassan" } });
  fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "karim@example.com" } });
  fireEvent.change(screen.getByLabelText(/what would you like to discuss/i), {
    target: { value: "I would like to discuss a new website for my clinic." },
  });
}

beforeEach(() => {
  vi.unstubAllGlobals();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ConsultationPage", () => {
  it("loads available slots and pre-selects the first day and time", async () => {
    renderConsultationPage();
    await waitForSlotsToLoad();

    const dayPicker = within(screen.getByTestId("day-picker"));
    const dayButtons = dayPicker.getAllByRole("button");
    expect(dayButtons.length).toBeGreaterThan(0);
    expect(dayButtons[0]).toHaveAttribute("aria-pressed", "true");

    const timePicker = within(screen.getByTestId("time-picker"));
    const timeButtons = timePicker.getAllByRole("button");
    expect(timeButtons[0]).toHaveAttribute("aria-pressed", "true");

    expect(screen.getByTestId("selected-slot").textContent).not.toBe("—");
  });

  it("Trap: selecting a different day resets the selected time to that day's first slot", async () => {
    renderConsultationPage();
    await waitForSlotsToLoad();

    const dayPicker = within(screen.getByTestId("day-picker"));
    const dayButtons = dayPicker.getAllByRole("button");
    if (dayButtons.length < 2) return; // guaranteed >= daysAheadToShow in practice, but stay safe

    const secondDayLabel = dayButtons[1].textContent;
    fireEvent.click(dayButtons[1]);

    expect(dayButtons[1]).toHaveAttribute("aria-pressed", "true");
    const timePicker = within(screen.getByTestId("time-picker"));
    const timeButtons = timePicker.getAllByRole("button");
    expect(timeButtons[0]).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("selected-slot").textContent).toContain(secondDayLabel);
  });

  it("updates the summary when a different time is selected", async () => {
    renderConsultationPage();
    await waitForSlotsToLoad();

    const timePicker = within(screen.getByTestId("time-picker"));
    const timeButtons = timePicker.getAllByRole("button");
    if (timeButtons.length < 2) return;

    fireEvent.click(timeButtons[1]);
    expect(timeButtons[1]).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("selected-slot").textContent).toContain(timeButtons[1].textContent);
  });

  it("Trap: blocks submission and shows a field error for a missing name, without calling the API", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderConsultationPage();
    await waitForSlotsToLoad();

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "karim@example.com" } });
    fireEvent.change(screen.getByLabelText(/what would you like to discuss/i), {
      target: { value: "I would like to discuss a new website." },
    });
    fireEvent.click(screen.getByRole("button", { name: /request this slot/i }));

    await waitFor(() => {
      expect(screen.getByText("Name must be at least 2 characters long")).toBeInTheDocument();
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("submits the selected day/time along with the form fields", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: "Thanks!" }),
    });
    vi.stubGlobal("fetch", fetchMock);
    renderConsultationPage();
    await waitForSlotsToLoad();

    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: /request this slot/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.name).toBe("Karim Hassan");
    expect(body.dateKey).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(body.time).toMatch(/^\d{1,2}:\d{2} (AM|PM)$/);
  });

  it("Trap: tracks consultation_requested with the submitted date/time only after a successful submission", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: "Thanks!" }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const { events, restore } = captureAnalyticsEvents();

    renderConsultationPage();
    await waitForSlotsToLoad();
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: /request this slot/i }));

    await waitFor(() => {
      expect(events.some((e) => e.name === "consultation_requested")).toBe(true);
    });
    restore();
  });

  it("shows a server error message and tracks a server-reason error event when the API rejects", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, error: "Slot no longer available" }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const { events, restore } = captureAnalyticsEvents();

    renderConsultationPage();
    await waitForSlotsToLoad();
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: /request this slot/i }));

    await waitFor(() => {
      expect(screen.getByText("Slot no longer available")).toBeInTheDocument();
    });
    expect(events).toContainEqual({ name: "consultation_error", reason: "server" });
    restore();
  });

  it("builds a WhatsApp link that reflects the currently selected slot and tracks its click", async () => {
    const { events, restore } = captureAnalyticsEvents();
    renderConsultationPage();
    await waitForSlotsToLoad();

    const link = screen.getByRole("link", { name: /send via whatsapp instead/i });
    const href = link.getAttribute("href")!;
    expect(href).toContain("https://wa.me/201107578212?text=");

    fireEvent.click(link);
    expect(events).toContainEqual({ name: "whatsapp_click", source: "consultation_page" });
    restore();
  });
});
