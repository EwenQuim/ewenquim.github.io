import type { MatrixStrategy } from "../components/prosoners-dilemma/IDPGame";

export type Decision = "coop" | "betray";
export const asEmoji = (d: Decision) => (d === "coop" ? "🤗" : "🔪");

export const strategies = {
  betray: {
    previousTurnIBetrayed: { coop: 0, betray: 0 },
    previousTurnICoop: { coop: 0, betray: 0 },
  },

  trust: {
    previousTurnIBetrayed: { coop: 100, betray: 100 },
    previousTurnICoop: { coop: 100, betray: 100 },
  },

  copycat: {
    previousTurnIBetrayed: { coop: 100, betray: 0 },
    previousTurnICoop: { coop: 100, betray: 0 },
  },

  control1: {
    previousTurnIBetrayed: { coop: 20, betray: 10 },
    previousTurnICoop: { coop: 90, betray: 70 },
  },

  extorsion2: {
    previousTurnICoop: { coop: 88, betray: 50 },
    previousTurnIBetrayed: { coop: 33, betray: 0 },
  },

  cautious: {
    previousTurnICoop: { coop: 100, betray: 0 },
    previousTurnIBetrayed: { coop: 0, betray: 0 },
  },

  inspired: {
    previousTurnICoop: { coop: 99, betray: 50 },
    previousTurnIBetrayed: { coop: 90, betray: 10 },
  },
} as const satisfies Record<string, MatrixStrategy>;
export type strategyNames = keyof typeof strategies;
