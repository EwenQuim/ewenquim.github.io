import { useState } from "react";
import type { MatrixStrategy } from "./IDPGame";

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
  // Display the table with the coefficients for each player
  return (
    <table className="m-2 border">
      <caption>{playerName} Strategy</caption>

      <tr>
        <th>
          <select name="strategy" id="strategy">
            <option value="custom">Custom</option>
            <option disabled>-</option>

            <option value="matrix">Matrix</option>
            <option value="random">Random</option>
            <option disabled>-</option>
            <option value="control1">Control 1</option>

            <option value="control2">Control 2</option>
            <option value="extortion15">Extortion 1.5x</option>
            <option value="extortion2">Extortion 2x</option>
            <option value="extortion25">Extortion 2.5x</option>
            <option value="extortion3">Extortion 3x</option>
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
        <th>🤗</th>
        <td>
          <span className="flex gap-2">
            <input
              type="number"
              min={0}
              step={10}
              max={100}
              className="max-w-[3rem]"
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
          <span className="flex gap-2">
            <input
              type="number"
              min={0}
              step={10}
              max={100}
              className="max-w-[3rem]"
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
      <tr>
        <th>🔪</th>
        <td>
          <span className="flex gap-2">
            <input
              type="number"
              min={0}
              step={10}
              max={100}
              className="max-w-[3rem]"
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
          <span className="flex gap-2">
            <input
              type="number"
              min={0}
              step={10}
              max={100}
              className="max-w-[3rem]"
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
    </table>
  );
};
