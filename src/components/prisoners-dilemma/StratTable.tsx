import { useState } from "react";

import {
  PrisonersDilemmaStrategy,
  asEmoji,
  strategies,
} from "./prisonersDilemma";

type StratTableProps = {
  playerName: string;
  strategy: PrisonersDilemmaStrategy;
  setStrategy: (strategy: PrisonersDilemmaStrategy) => void;
  resetStrategy: () => void;
};
export const StratTable = ({
  playerName,
  strategy,
  setStrategy,
  resetStrategy,
}: StratTableProps) => {
  const setPresetStrategy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const preset = strategies[e.target.value as keyof typeof strategies];
    if (preset) setStrategy(preset);
  };

  const setCustomStrategy = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <table className="m-2 border">
      <caption>{playerName} Strategy</caption>

      <tr>
        <th>
          <select name="strategy" id="strategy" onChange={setPresetStrategy}>
            <option value="custom">Custom</option>
            <option disabled>-</option>
            {Object.entries(strategies).map((s, b) => (
              <option key={s[0]} value={s[0]}>
                {s[1].name}
              </option>
            ))}
          </select>
        </th>
        <th>
          <button onClick={resetStrategy}>reset</button>
        </th>
        <th colSpan={2}>Opponent</th>
      </tr>
      <tr>
        <th></th>
        <th></th>
        <th>🤗</th>
        <th>🔪</th>
      </tr>
      <tr>
        <th rowSpan={2}>Me</th>
        <th>{asEmoji("coop")}</th>
        <td>
          <span className="flex gap-1">
            <input
              type="number"
              min={0}
              step={10}
              max={100}
              className="max-w-[3rem] border-none"
              value={strategy.strategy.previousTurnICoop.coop}
              onChange={(e) =>
                setStrategy({
                  ...strategy,
                  strategy: {
                    ...strategy.strategy,
                    previousTurnICoop: {
                      ...strategy.strategy.previousTurnICoop,
                      coop: Number(e.target.value),
                    },
                  },
                })
              }
            />
            %
          </span>
        </td>
        <td>
          <span className="flex gap-1">
            <input
              type="number"
              min={0}
              step={10}
              max={100}
              className="max-w-[3rem] border-none"
              value={strategy.strategy.previousTurnICoop.betray}
              onChange={(e) =>
                setStrategy({
                  ...strategy,
                  strategy: {
                    ...strategy.strategy,
                    previousTurnICoop: {
                      ...strategy.strategy.previousTurnICoop,
                      betray: Number(e.target.value),
                    },
                  },
                })
              }
            />
            %
          </span>
        </td>
      </tr>
      <tr>
        <th>{asEmoji("betray")}</th>
        <td>
          <span className="flex gap-1">
            <input
              type="number"
              min={0}
              step={10}
              max={100}
              className="max-w-[3rem] border-none"
              value={strategy.strategy.previousTurnIBetrayed.coop}
              onChange={(e) =>
                setStrategy({
                  ...strategy,
                  strategy: {
                    ...strategy.strategy,
                    previousTurnIBetrayed: {
                      ...strategy.strategy.previousTurnIBetrayed,
                      coop: Number(e.target.value),
                    },
                  },
                })
              }
            />
            %
          </span>
        </td>
        <td>
          <span className="flex gap-1">
            <input
              type="number"
              min={0}
              step={10}
              max={100}
              className="max-w-[3rem] border-none"
              value={strategy.strategy.previousTurnIBetrayed.betray}
              onChange={(e) =>
                setStrategy({
                  ...strategy,
                  strategy: {
                    ...strategy.strategy,
                    previousTurnIBetrayed: {
                      ...strategy.strategy.previousTurnIBetrayed,
                      betray: Number(e.target.value),
                    },
                  },
                })
              }
            />
            %
          </span>
        </td>
      </tr>
    </table>
  );
};
