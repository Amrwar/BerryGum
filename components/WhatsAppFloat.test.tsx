import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import WhatsAppFloat from "./WhatsAppFloat";
import { LanguageProvider } from "@/lib/LanguageContext";

function renderFloat() {
  return render(
    <LanguageProvider>
      <WhatsAppFloat />
    </LanguageProvider>
  );
}

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", { value, configurable: true, writable: true });
  fireEvent.scroll(window);
}

beforeEach(() => {
  vi.useFakeTimers();
  setScrollY(0);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("WhatsAppFloat", () => {
  it("links to the general WhatsApp message with the shop number", () => {
    renderFloat();
    const link = screen.getByRole("link", { name: /chat on whatsapp/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("https://wa.me/201107578212?text="));
  });

  it("Trap: stays hidden until the page is scrolled past 300px", () => {
    renderFloat();
    const container = screen.getByRole("link", { name: /chat on whatsapp/i }).closest("div.fixed")!;
    expect(container.className).toContain("opacity-0");

    setScrollY(200);
    expect(container.className).toContain("opacity-0");

    setScrollY(301);
    expect(container.className).toContain("opacity-100");
  });

  it("hides again once scrolled back above the 300px threshold", () => {
    renderFloat();
    const container = screen.getByRole("link", { name: /chat on whatsapp/i }).closest("div.fixed")!;

    setScrollY(400);
    expect(container.className).toContain("opacity-100");

    setScrollY(0);
    expect(container.className).toContain("opacity-0");
  });

  it("Trap: shows the tooltip 5s after mount, then hides it again 5s later", () => {
    renderFloat();
    const tooltipWrapper = document.querySelector("div.absolute.bottom-full") as HTMLElement;
    expect(tooltipWrapper.className).toContain("opacity-0");

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(tooltipWrapper.className).toContain("opacity-100");

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(tooltipWrapper.className).toContain("opacity-0");
  });

  it("clicking the WhatsApp link immediately dismisses a visible tooltip", () => {
    renderFloat();
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    const tooltipWrapper = document.querySelector("div.absolute.bottom-full") as HTMLElement;
    expect(tooltipWrapper.className).toContain("opacity-100");

    fireEvent.click(screen.getByRole("link", { name: /chat on whatsapp/i }));
    expect(tooltipWrapper.className).toContain("opacity-0");
  });
});
