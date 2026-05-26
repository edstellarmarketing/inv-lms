"use client";
import { useState } from "react";
import Link from "next/link";
import LmsFrame from "../../../components/LmsFrame";

type Card = { front: string; back: string; cluster: string };

const cards: Card[] = [
  { front: "What is CPI?",            back: "Cost Performance Index = EV / AC. CPI < 1 means over budget.",            cluster: "Process · EVM" },
  { front: "What is SPI?",            back: "Schedule Performance Index = EV / PV. SPI < 1 means behind schedule.",    cluster: "Process · EVM" },
  { front: "Define EAC (formula 1)",  back: "Estimate At Completion = BAC / CPI when current variances will continue.", cluster: "Process · EVM" },
  { front: "Define ETC",              back: "Estimate To Complete = EAC - AC. Remaining cost to finish.",                cluster: "Process · EVM" },
];

const stats = { due: 18, total: 240, learned: 152, mastered: 70 };

export default function FlashcardsPage() {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[idx];

  const rate = (delta: number) => {
    setFlipped(false);
    setIdx((idx + 1) % cards.length);
  };

  return (
    <LmsFrame
      active="AI Mentor"
      crumbs={[
        { label: "Back to Dashboard", href: "/lms/pmp" },
        { label: "AI tools", href: "/lms/pmp/ai" },
        { label: "Adaptive Flashcards" },
      ]}
      title="🎴 Adaptive Flashcards"
      subtitle="SM-2 spaced repetition. Cards float through Again → Hard → Good → Easy queues based on your self-rating."
      right={
        <div className="fc-head">
          <small>Today's deck</small>
          <strong>{stats.due} due</strong>
        </div>
      }
    >
      <section className="fc-stats">
        <article><small>Due today</small><strong>{stats.due}</strong></article>
        <article><small>Learning</small><strong>{stats.learned}</strong></article>
        <article><small>Mastered</small><strong>{stats.mastered}</strong></article>
        <article><small>Total deck</small><strong>{stats.total}</strong></article>
      </section>

      <section className="fc-stage">
        <div className={`fc-card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
          <div className="fc-face fc-front">
            <small>{card.cluster}</small>
            <h2>{card.front}</h2>
            <span className="fc-tap">Tap to flip</span>
          </div>
          <div className="fc-face fc-back">
            <small>Answer</small>
            <p>{card.back}</p>
          </div>
        </div>

        {flipped && (
          <div className="fc-rate">
            <button type="button" className="fc-rate-btn again" onClick={() => rate(0)}><strong>Again</strong><small>1 min</small></button>
            <button type="button" className="fc-rate-btn hard"  onClick={() => rate(1)}><strong>Hard</strong><small>10 min</small></button>
            <button type="button" className="fc-rate-btn good"  onClick={() => rate(2)}><strong>Good</strong><small>1 day</small></button>
            <button type="button" className="fc-rate-btn easy"  onClick={() => rate(3)}><strong>Easy</strong><small>3 days</small></button>
          </div>
        )}

        <div className="fc-nav">
          <small>Card {idx + 1} of {cards.length} in today's queue</small>
        </div>
      </section>

      <section className="fc-tip">
        <i className="fa-solid fa-lightbulb"></i>
        <span>Rating <strong>Again</strong> brings the card back fast. <strong>Easy</strong> pushes it 3× further out. Be honest — the algorithm relies on it.</span>
      </section>
    </LmsFrame>
  );
}
