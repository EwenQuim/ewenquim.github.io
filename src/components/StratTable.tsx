import { useState } from "react";
import type { MatrixStrategy } from "./IDPGame";

type StratTableProps = {
  playerName: string;
  strategy: MatrixStrategy;
  setStrategy: (strategy: MatrixStrategy) => void;
};
export const StratTable = ({
  playerName,
  strategy,
  setStrategy,
}: StratTableProps) => {
  // Display the table with the coefficients for each player
  return (
    <table className="m-2 border">
      <caption>{playerName} Strategy</caption>

      <tr>
        <th></th>
        <th>Cooperate</th>
        <th>Betray</th>
      </tr>
      <tr>
        <th>Me</th>
        <td>
          <span className="flex gap-2">
            <input
              type="number"
              className="max-w-[5rem]"
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
              className="max-w-[5rem]"
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
        <th>Opponent</th>
        <td>
          <span className="flex gap-2">
            <input
              type="number"
              className="max-w-[5rem]"
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
              className="max-w-[5rem]"
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
