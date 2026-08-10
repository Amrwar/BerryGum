import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import FAQ from "./FAQ";
import { LanguageProvider } from "@/lib/LanguageContext";
import en from "@/messages/en.json";

const allQuestions = Object.values(en.faq.items).map((item) => item.question);

function renderFAQ(limit?: number) {
  return render(
    <LanguageProvider>
      <FAQ limit={limit} />
    </LanguageProvider>
  );
}

describe("FAQ", () => {
  it("renders every FAQ item when no limit is given", () => {
    renderFAQ();
    for (const question of allQuestions) {
      expect(screen.getByText(question)).toBeInTheDocument();
    }
  });

  it("Trap: limit truncates to the first N items, not a random subset", () => {
    renderFAQ(3);
    for (const question of allQuestions.slice(0, 3)) {
      expect(screen.getByText(question)).toBeInTheDocument();
    }
    for (const question of allQuestions.slice(3)) {
      expect(screen.queryByText(question)).not.toBeInTheDocument();
    }
  });

  it("the first item's answer is visible by default", () => {
    renderFAQ();
    expect(screen.getByText(en.faq.items[Object.keys(en.faq.items)[0] as keyof typeof en.faq.items].answer)).toBeInTheDocument();
  });

  it("Trap: opening a second item closes the first, since only one panel stays open at a time", () => {
    renderFAQ();
    const secondQuestion = allQuestions[1];
    const secondAnswer = Object.values(en.faq.items)[1].answer;
    const firstAnswer = Object.values(en.faq.items)[0].answer;

    fireEvent.click(screen.getByText(secondQuestion));

    const firstAnswerEl = screen.getByText(firstAnswer).closest("div.overflow-hidden");
    const secondAnswerEl = screen.getByText(secondAnswer).closest("div.overflow-hidden");
    expect(firstAnswerEl?.className).toContain("max-h-0");
    expect(secondAnswerEl?.className).toContain("max-h-96");
  });

  it("clicking an open item's question closes it, collapsing every panel", () => {
    renderFAQ();
    const firstQuestion = allQuestions[0];
    const firstAnswer = Object.values(en.faq.items)[0].answer;

    fireEvent.click(screen.getByText(firstQuestion));

    const firstAnswerEl = screen.getByText(firstAnswer).closest("div.overflow-hidden");
    expect(firstAnswerEl?.className).toContain("max-h-0");
  });
});
