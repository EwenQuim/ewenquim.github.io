export type Decision = "coop" | "betray";
export const asEmoji = (d: Decision) => (d === "coop" ? "🤗" : "🔪");

export const defaultGains = {
  coop: { coop: 3, betray: -1 },
  betray: { coop: 5, betray: 0 },
};

export const strategies = {
  betray: {
    id: "betray",
    name: "Traitor",
    firstMove: "coop",
    strategy: {
      previousTurnIBetrayed: { coop: 0, betray: 0 },
      previousTurnICoop: { coop: 0, betray: 0 },
    },
  },

  trust: {
    id: "trust",
    name: "Naive",
    firstMove: "coop",
    strategy: {
      previousTurnIBetrayed: { coop: 100, betray: 100 },
      previousTurnICoop: { coop: 100, betray: 100 },
    },
  },

  copycat: {
    id: "copycat",
    name: "CopyCat",
    firstMove: "coop",
    strategy: {
      previousTurnIBetrayed: { coop: 100, betray: 0 },
      previousTurnICoop: { coop: 100, betray: 0 },
    },
  },

  control1: {
    id: "control1",
    name: "Control 2",
    firstMove: "coop",
    strategy: {
      previousTurnIBetrayed: { coop: 20, betray: 10 },
      previousTurnICoop: { coop: 90, betray: 70 },
    },
  },

  extorsion2: {
    id: "extorsion2",
    name: "Extorsion 2",
    firstMove: "coop",
    strategy: {
      previousTurnICoop: { coop: 88, betray: 50 },
      previousTurnIBetrayed: { coop: 33, betray: 0 },
    },
  },

  cautious: {
    id: "cautious",
    name: "Cautious",
    firstMove: "coop",
    strategy: {
      previousTurnICoop: { coop: 100, betray: 0 },
      previousTurnIBetrayed: { coop: 0, betray: 0 },
    },
  },

  inspired: {
    id: "inspired",
    name: "Inspired",
    firstMove: "coop",
    strategy: {
      previousTurnICoop: { coop: 99, betray: 50 },
      previousTurnIBetrayed: { coop: 90, betray: 10 },
    },
  },
} as const satisfies Record<string, PrisonersDilemmaStrategy>;
export type strategyNames = keyof typeof strategies;

export type PrisonersDilemmaStrategy = {
  id: string;
  name: string;
  firstMove: Decision;
  strategy: MatrixStrategy;
};

export type MatrixStrategy = {
  previousTurnIBetrayed: { coop: number; betray: number };
  previousTurnICoop: { coop: number; betray: number };
};
