import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, renderHook } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import en from "@/messages/en.json";

function TestConsumer() {
  const { locale, t, setLocale } = useLanguage();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="nav-home">{t("nav.home")}</span>
      <span data-testid="missing-key">{t("nav.doesNotExist")}</span>
      <button onClick={() => setLocale("ar")}>Switch to Arabic</button>
    </div>
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.lang = "";
  document.documentElement.dir = "";
});

describe("LanguageProvider / useLanguage", () => {
  it("defaults to English on first render", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("locale").textContent).toBe("en");
  });

  it("t() resolves a dot-path key into the current locale's nested messages", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("nav-home").textContent).toBe(en.nav.home);
  });

  it("Trap: t() falls back to returning the key itself when the path doesn't resolve, not an empty string", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("missing-key").textContent).toBe("nav.doesNotExist");
  });

  it("setLocale updates the locale, persists it to localStorage, and flips the document to RTL for Arabic", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByText("Switch to Arabic"));
    expect(screen.getByTestId("locale").textContent).toBe("ar");
    expect(localStorage.getItem("locale")).toBe("ar");
    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("ar");
  });

  it("Trap: restores a previously saved Arabic locale from localStorage on mount, including RTL direction", () => {
    localStorage.setItem("locale", "ar");
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("locale").textContent).toBe("ar");
    expect(document.documentElement.dir).toBe("rtl");
  });

  it("ignores an invalid saved locale value and keeps the English default", () => {
    localStorage.setItem("locale", "fr");
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("locale").textContent).toBe("en");
  });

  it("throws a descriptive error when useLanguage is called outside a LanguageProvider", () => {
    const { result } = renderHook(() => {
      try {
        return useLanguage();
      } catch (e) {
        return e as Error;
      }
    });
    expect(result.current).toBeInstanceOf(Error);
    expect((result.current as Error).message).toBe(
      "useLanguage must be used within LanguageProvider"
    );
  });
});
