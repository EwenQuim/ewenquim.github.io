import { useState } from "react";
import type { MatrixStrategy } from "./IDPGame";
import { asEmoji, strategies } from "../../utils/prisoners-dilemma";

type StratTableProps = {
  playerName: string;
  strategy: MatrixStrategy;
  setStrategy: (strategy: MatrixStrategy) => void;
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
                {s[0]}
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
              value={strategy.previousTurnICoop.coop}
              onChange={(e) =>
                setStrategy({
                  ...strategy,
                  previousTurnICoop: {
                    ...strategy.previousTurnICoop,
                    coop: Number(e.target.value),
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
              value={strategy.previousTurnICoop.betray}
              onChange={(e) =>
                setStrategy({
                  ...strategy,
                  previousTurnICoop: {
                    ...strategy.previousTurnICoop,
                    betray: Number(e.target.value),
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
              value={strategy.previousTurnIBetrayed.coop}
              onChange={(e) =>
                setStrategy({
                  ...strategy,
                  previousTurnIBetrayed: {
                    ...strategy.previousTurnIBetrayed,
                    coop: Number(e.target.value),
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
              value={strategy.previousTurnIBetrayed.betray}
              onChange={(e) =>
                setStrategy({
                  ...strategy,
                  previousTurnIBetrayed: {
                    ...strategy.previousTurnIBetrayed,
                    betray: Number(e.target.value),
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
