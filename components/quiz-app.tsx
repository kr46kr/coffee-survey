"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  buildBlendNarrative,
  personalities,
  personalityOrder,
  questions,
  type PersonalityKey,
} from "@/data/quiz";

type Stage = "intro" | "quiz" | "result";

type Selection = {
  questionId: string;
  trait: PersonalityKey;
  answerLabel: string;
};

const stageAccent: Record<Stage, string> = {
  intro: "Start with a strong first impression",
  quiz: "A little personality, one answer at a time",
  result: "This is the retention moment NovaBrew has been missing",
};

export function QuizApp() {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState<Selection[]>([]);
  const [copied, setCopied] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = stage === "quiz" ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const result = useMemo(() => {
    const totals = new Map<PersonalityKey, number>();
    const lastSeen = new Map<PersonalityKey, number>();

    personalityOrder.forEach((key) => {
      totals.set(key, 0);
      lastSeen.set(key, -1);
    });

    selections.forEach((selection, index) => {
      totals.set(selection.trait, (totals.get(selection.trait) ?? 0) + 1);
      lastSeen.set(selection.trait, index);
    });

    const ranked = [...personalityOrder].sort((left, right) => {
      const scoreDelta = (totals.get(right) ?? 0) - (totals.get(left) ?? 0);
      if (scoreDelta !== 0) {
        return scoreDelta;
      }

      return (lastSeen.get(right) ?? -1) - (lastSeen.get(left) ?? -1);
    });

    const primary = personalities[ranked[0]];
    const secondary = personalities[ranked[1]];
    const maxScore = selections.length || 1;

    const percentageMap = ranked.map((key) => ({
      key,
      name: personalities[key].name,
      percent: Math.round(((totals.get(key) ?? 0) / maxScore) * 100),
    }));

    return {
      primary,
      secondary,
      breakdown: percentageMap,
    };
  }, [selections]);

  const resultCoffeeMatches = useMemo(() => {
    const unique = new Map<
      string,
      { companyDescription: string; fitReason: string }
    >();

    [...result.primary.coffees, ...result.secondary.coffees].forEach((coffee) => {
      if (!unique.has(coffee.name)) {
        unique.set(coffee.name, {
          companyDescription: coffee.companyDescription,
          fitReason: coffee.fitReason,
        });
      }
    });

    return [...unique.entries()].map(([name, details]) => ({
      name,
      companyDescription: details.companyDescription,
      fitReason: details.fitReason,
    }));
  }, [result.primary, result.secondary]);

  const handleAnswer = (trait: PersonalityKey, answerLabel: string) => {
    const nextSelections = [
      ...selections,
      {
        questionId: currentQuestion.id,
        trait,
        answerLabel,
      },
    ];

    setSelections(nextSelections);

    if (currentIndex === questions.length - 1) {
      setStage("result");
      return;
    }

    setCurrentIndex((index) => index + 1);
  };

  const handleRetake = () => {
    setStage("intro");
    setSelections([]);
    setCurrentIndex(0);
    setCopied(false);
  };

  const handleCopy = async () => {
    const text = `I got ${result.primary.name} with ${result.secondary.name} tendencies on the NovaBrew Coffee Taste Profile Quiz.`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 text-[var(--foreground)] sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-center">
        <div className="mb-5 flex items-center justify-between gap-3 text-sm text-[var(--muted)]">
          <div className="flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/50 px-3 py-2 backdrop-blur-sm">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
            NovaBrew Coffee Co.
          </div>
          <div className="hidden rounded-full border border-[var(--border-soft)] bg-white/50 px-3 py-2 text-right backdrop-blur-sm md:block">
            {stageAccent[stage]}
          </div>
        </div>

        {stage === "intro" ? (
          <section className="glass-panel-strong animate-rise-in grid overflow-hidden rounded-[34px] lg:grid-cols-[1.15fr_0.85fr]">
            <div className="px-7 py-10 sm:px-10 lg:px-12 lg:py-14">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Coffee Taste Profile Quiz
              </p>
              <h1 className="font-display max-w-2xl text-5xl leading-[0.95] font-black tracking-tight text-[var(--accent-ink)] sm:text-6xl lg:text-7xl">
                Give every subscriber a cup that feels personal.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
                This is the product NovaBrew needed in Module 1: a premium quiz that
                turns taste into identity, and identity into better coffee matching.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <FeatureCard
                  title="Primary + secondary result"
                  body="The result feels specific enough to share, but flexible enough to feel real."
                />
                <FeatureCard
                  title="Designed for retention"
                  body="Every question is built to make subscribers feel known before the third shipment."
                />
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  className="group inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-7 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-ink)]"
                  onClick={() => setStage("quiz")}
                  type="button"
                >
                  Start the quiz
                  <span className="ml-2 transition group-hover:translate-x-0.5">→</span>
                </button>
                <p className="text-sm leading-6 text-[var(--muted)]">
                  6 questions. About 90 seconds. Built to feel premium, not gimmicky.
                </p>
              </div>
            </div>

            <div className="relative min-h-[340px] border-t border-[var(--border-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(141,90,52,0.12))] p-6 lg:min-h-full lg:border-t-0 lg:border-l">
              <div className="glass-panel h-full rounded-[28px] p-6 sm:p-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Your result might sound like
                </p>
                <div className="relative mb-5 overflow-hidden rounded-[24px] border border-[var(--border-soft)] bg-[rgba(255,255,255,0.72)] p-4">
                  <Image
                    alt="Sample NovaBrew result illustration"
                    className="h-[210px] w-full rounded-[18px] object-cover"
                    height={420}
                    priority
                    src="/images/smooth-operator.svg"
                    width={420}
                  />
                </div>
                <p className="font-display text-3xl font-black text-[var(--accent-ink)]">
                  Smooth Operator
                </p>
                <p className="mt-2 text-base leading-7 text-[var(--muted)]">
                  Balanced, polished, and easy to love. The kind of coffee identity
                  that makes people trust the next bag before they even open it.
                </p>
                <div className="mt-6 space-y-3">
                  <MiniRow label="Primary match" value="Sunrise Blend" />
                  <MiniRow label="Secondary note" value="Wild Card tendencies" />
                  <MiniRow label="Designed for" value="shareability + retention" />
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {stage === "quiz" ? (
          <section className="glass-panel-strong animate-rise-in rounded-[34px] px-6 py-8 sm:px-9 sm:py-10 lg:px-12">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Question {currentIndex + 1} of {questions.length}
                </p>
                <h2 className="font-display mt-3 text-4xl font-black leading-[1.02] text-[var(--accent-ink)] sm:text-5xl">
                  {currentQuestion.prompt}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[var(--muted)] md:text-right">
                {currentQuestion.support}
              </p>
            </div>

            <div className="mb-8 h-2.5 overflow-hidden rounded-full bg-[rgba(141,90,52,0.12)]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent-soft),var(--accent))] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div key={currentQuestion.id} className="animate-rise-in grid gap-4">
              {currentQuestion.answers.map((answer) => (
                <button
                  key={answer.id}
                  className="group glass-panel rounded-[22px] px-5 py-5 text-left transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[rgba(255,255,255,0.94)] sm:px-6"
                  onClick={() => handleAnswer(answer.trait, answer.label)}
                  type="button"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white/85 text-sm font-semibold text-[var(--accent-ink)] transition group-hover:bg-[var(--accent)] group-hover:text-white">
                      {answer.label}
                    </div>
                    <p className="pt-1 text-base leading-7 text-[var(--accent-ink)] sm:text-lg">
                      {answer.text}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {stage === "result" ? (
          <section className="glass-panel-strong animate-fade-in rounded-[34px] px-6 py-8 sm:px-9 sm:py-10 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                    Your NovaBrew profile
                  </p>
                  <h2 className="font-display mt-3 text-5xl font-black leading-[0.95] text-[var(--accent-ink)] sm:text-6xl">
                    {result.primary.name}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-[var(--muted)]">
                    {result.primary.eyebrow}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-[28px] border border-[var(--border-soft)] bg-white/70 p-3">
                  <Image
                    alt={`${result.primary.name} illustration`}
                    className="h-[280px] w-full rounded-[22px] object-cover"
                    height={560}
                    priority
                    src={result.primary.image}
                    width={560}
                  />
                </div>

                <div className="glass-panel rounded-[24px] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                    Secondary tendency
                  </p>
                  <p className="font-display mt-2 text-3xl font-black text-[var(--accent-ink)]">
                    {result.secondary.name}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {result.secondary.shortDescription}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-panel rounded-[28px] p-6">
                  <p className="font-display text-3xl font-black text-[var(--accent-ink)]">
                    {result.primary.resultTitle}
                  </p>
                  <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                    {result.primary.longDescription}
                  </p>
                  <p className="mt-4 rounded-[20px] border border-[var(--border-soft)] bg-white/70 px-4 py-4 text-sm leading-7 text-[var(--accent-ink)]">
                    {buildBlendNarrative(result.primary, result.secondary)}
                  </p>
                </div>

                <div className="glass-panel rounded-[28px] p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        Recommended coffees
                      </p>
                      <h3 className="font-display mt-2 text-3xl font-black text-[var(--accent-ink)]">
                        What NovaBrew should send you first
                      </h3>
                    </div>
                    <button
                      className="rounded-full border border-[var(--border-strong)] px-4 py-2 text-sm font-semibold text-[var(--accent-ink)] transition hover:bg-white"
                      onClick={handleCopy}
                      type="button"
                    >
                      {copied ? "Copied" : "Share result"}
                    </button>
                  </div>

                  <div className="mt-5 grid gap-4">
                    {resultCoffeeMatches.map((coffee, index) => (
                      <div
                        key={coffee.name}
                        className="rounded-[22px] border border-[var(--border-soft)] bg-white/76 p-4"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-display text-2xl font-black text-[var(--accent-ink)]">
                            {coffee.name}
                          </p>
                          <span className="rounded-full bg-[rgba(141,90,52,0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                            Match {index + 1}
                          </span>
                        </div>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                          What it is
                        </p>
                        <p className="mt-1 text-sm leading-7 text-[var(--muted)]">
                          {coffee.companyDescription}
                        </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                          Why it fits you
                        </p>
                        <p className="mt-1 text-sm leading-7 text-[var(--accent-ink)]">
                          {coffee.fitReason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                  <div className="glass-panel rounded-[24px] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                      Personality balance
                    </p>
                    <div className="mt-4 space-y-3">
                      {result.breakdown.slice(0, 3).map((item) => (
                        <div key={item.key}>
                          <div className="mb-1 flex items-center justify-between text-sm text-[var(--muted)]">
                            <span>{item.name}</span>
                            <span>{item.percent}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-[rgba(141,90,52,0.12)]">
                            <div
                              className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent-soft),var(--accent))]"
                              style={{ width: `${Math.max(item.percent, 8)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    className="rounded-[24px] bg-[var(--accent)] px-6 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-ink)]"
                    onClick={handleRetake}
                    type="button"
                  >
                    Retake quiz
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass-panel rounded-[24px] p-5">
      <p className="font-display text-2xl font-black text-[var(--accent-ink)]">
        {title}
      </p>
      <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{body}</p>
    </div>
  );
}

function MiniRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[18px] border border-[var(--border-soft)] bg-white/72 px-4 py-3">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
        {label}
      </span>
      <span className="text-sm font-semibold text-[var(--accent-ink)]">{value}</span>
    </div>
  );
}
