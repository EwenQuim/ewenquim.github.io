import { useState } from "react";

import {
  PrisonersDilemmaStrategy,
  asEmoji,
  strategies,
} from "./prisonersDilemma";

const getColor = (n: number): string => {
  const red = 255 - 4 * Math.max(n - 50, 0);
  const green = Math.min(255, 5 * n);
  const blue = 0;
  return `rgba(${red}, ${green}, ${blue}, 0.3)`;
};

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

  return (
    <table className="shadow">
      <caption>{playerName} Strategy</caption>

      <tr>
        <th colSpan={2} className="border-none">
          <select
            name="strategy"
            id="strategy"
            onChange={setPresetStrategy}
            defaultValue={strategy.id}
          >
            <option value="custom">Custom</option>
            <option disabled>-</option>
            {Object.entries(strategies).map((s, b) => (
              <option key={s[0]} value={s[0]}>
                {s[1].name}
              </option>
            ))}
          </select>
        </th>

        <th colSpan={2}>Opponent</th>
      </tr>
      <tr>
        <th colSpan={2} className="border-none">
          <button onClick={resetStrategy}>reset</button>
        </th>
        <th>🤗</th>
        <th>🔪</th>
      </tr>
      <tr>
        <th rowSpan={2}>Me</th>
        <th>{asEmoji("coop")}</th>
        <td
          style={{
            backgroundColor: getColor(strategy.strategy.previousTurnICoop.coop),
          }}
        >
          <span className="flex">
            <input
              type="number"
              min={0}
              step={10}
              max={100}
              className="max-w-[2rem] border-none text-right bg-transparent"
              value={strategy.strategy.previousTurnICoop.coop}
              onChange={(e) =>
                setStrategy({
                  ...strategy,
                  id: "custom",
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
        <td
          style={{
            backgroundColor: getColor(
              strategy.strategy.previousTurnICoop.betray
            ),
          }}
        >
          <span className="flex">
            <input
              type="number"
              min={0}
              step={10}
              max={100}
              className="max-w-[2rem] border-none text-right bg-transparent"
              value={strategy.strategy.previousTurnICoop.betray}
              onChange={(e) =>
                setStrategy({
                  ...strategy,
                  id: "custom",
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
        <td
          style={{
            backgroundColor: getColor(
              strategy.strategy.previousTurnIBetrayed.coop
            ),
          }}
        >
          <span className="flex">
            <input
              type="number"
              min={0}
              step={10}
              max={100}
              className="max-w-[2rem] border-none text-right bg-transparent"
              value={strategy.strategy.previousTurnIBetrayed.coop}
              onChange={(e) =>
                setStrategy({
                  ...strategy,
                  id: "custom",
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
        <td
          style={{
            backgroundColor: getColor(
              strategy.strategy.previousTurnIBetrayed.betray
            ),
          }}
        >
          <span className="flex">
            <input
              type="number"
              min={0}
              step={10}
              max={100}
              className="max-w-[2rem] border-none text-right bg-transparent"
              value={strategy.strategy.previousTurnIBetrayed.betray}
              onChange={(e) =>
                setStrategy({
                  ...strategy,
                  id: "custom",
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
