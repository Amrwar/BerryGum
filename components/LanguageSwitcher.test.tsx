import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSwitcher from "./LanguageSwitcher";
import { LanguageProvider } from "@/lib/LanguageContext";
import { captureAnalyticsEvents } from "@/lib/analytics";

function renderSwitcher() {
  return render(
    <LanguageProvider>
      <LanguageSwitcher />
    </LanguageProvider>
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.lang = "";
  document.documentElement.dir = "";
});

describe("LanguageSwitcher", () => {
  it("shows the Arabic label while in English, offering to switch to Arabic", () => {
    renderSwitcher();
    expect(screen.getByRole("button", { name: "Switch language" }).textContent).toContain("العربية");
  });

  it("Trap: switches document.documentElement.dir/lang and flips the button label after a click", () => {
    renderSwitcher();
    fireEvent.click(screen.getByRole("button", { name: "Switch language" }));

    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("ar");
    expect(screen.getByRole("button", { name: "Switch language" }).textContent).toContain("English");
  });

  it("Trap: tracks a language_switched event with the correct from/to on every toggle, not just the first", () => {
    const { events, restore } = captureAnalyticsEvents();
    renderSwitcher();

    fireEvent.click(screen.getByRole("button", { name: "Switch language" }));
    fireEvent.click(screen.getByRole("button", { name: "Switch language" }));

    expect(events).toEqual([
      { name: "language_switched", from: "en", to: "ar" },
      { name: "language_switched", from: "ar", to: "en" },
    ]);
    restore();
  });
});
