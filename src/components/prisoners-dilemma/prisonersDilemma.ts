export type Decision = "coop" | "betray";
export const asEmoji = (d: Decision) => (d === "coop" ? "🤗" : "🔪");

export const defaultGains = {
  coop: { coop: 3, betray: 0 },
  betray: { coop: 5, betray: 1 },
};

export const strategies = {
  betray: {
    name: "betray",
    firstMove: "coop",
    strategy: {
      previousTurnIBetrayed: { coop: 0, betray: 0 },
      previousTurnICoop: { coop: 0, betray: 0 },
    },
  },

  trust: {
    name: "trust",
    firstMove: "coop",
    strategy: {
      previousTurnIBetrayed: { coop: 100, betray: 100 },
      previousTurnICoop: { coop: 100, betray: 100 },
    },
  },

  copycat: {
    name: "copycat",
    firstMove: "coop",
    strategy: {
      previousTurnIBetrayed: { coop: 100, betray: 0 },
      previousTurnICoop: { coop: 100, betray: 0 },
    },
  },

  copyself1: {
    name: "CopySelf (start betraying)",
    firstMove: "betray",
    strategy: {
      previousTurnIBetrayed: { coop: 0, betray: 0 },
      previousTurnICoop: { coop: 100, betray: 100 },
    },
  },

  copyself2: {
    name: "CopySelf (start coop)",
    firstMove: "coop",
    strategy: {
      previousTurnIBetrayed: { coop: 0, betray: 0 },
      previousTurnICoop: { coop: 100, betray: 100 },
    },
  },

  control1: {
    name: "control1",
    firstMove: "coop",
    strategy: {
      previousTurnIBetrayed: { coop: 20, betray: 10 },
      previousTurnICoop: { coop: 90, betray: 70 },
    },
  },

  extorsion2: {
    name: "extorsion2",
    firstMove: "coop",
    strategy: {
      previousTurnICoop: { coop: 88, betray: 50 },
      previousTurnIBetrayed: { coop: 33, betray: 0 },
    },
  },

  cautious: {
    name: "cautious",
    firstMove: "coop",
    strategy: {
      previousTurnICoop: { coop: 100, betray: 0 },
      previousTurnIBetrayed: { coop: 0, betray: 0 },
    },
  },

  inspired: {
    name: "inspired",
    firstMove: "coop",
    strategy: {
      previousTurnICoop: { coop: 99, betray: 50 },
      previousTurnIBetrayed: { coop: 90, betray: 10 },
    },
  },
} as const satisfies Record<string, PrisonersDilemmaStrategy>;
export type strategyNames = keyof typeof strategies;

export type PrisonersDilemmaStrategy = {
  name: string;
  firstMove: Decision;
  strategy: MatrixStrategy;
};

export type MatrixStrategy = {
  previousTurnIBetrayed: { coop: number; betray: number };
  previousTurnICoop: { coop: number; betray: number };
};
