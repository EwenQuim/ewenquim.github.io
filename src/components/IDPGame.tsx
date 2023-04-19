import { useState } from "react";
import { StratTable } from "./StratTable";
import { roundedMean } from "../utils/maths";

export type MatrixStrategy = {
  previousTurnIBetrayed: { coop: number; betray: number };
  previousTurnICoop: { coop: number; betray: number };
};

type IDPGains = {
  coop: { coop: number; betray: number };
  betray: { coop: number; betray: number };
};

const gains: IDPGains = {
  coop: { coop: 3, betray: 0 },
  betray: { coop: 5, betray: 1 },
};

type Decision = "coop" | "betray";
const asEmoji = (d: Decision) => (d === "coop" ? "🤗" : "🔪");

const playNextTurn = (
  myStrategy: MatrixStrategy,
  oppStrategy: MatrixStrategy,
  myPreviousDecision: Decision,
  oppPreviousDecision: Decision
): { me: Decision; opp: Decision } => {
  const myProb = Math.random() * 100;
  const oppProb = Math.random() * 100;

  const myDecision =
    myProb < myStrategy.previousTurnIBetrayed[oppPreviousDecision]
      ? "coop"
      : "betray";

  const oppDecision =
    oppProb < oppStrategy.previousTurnIBetrayed[myPreviousDecision]
      ? "coop"
      : "betray";

  return { me: myDecision, opp: oppDecision };
};

type IDPGameProps = {
  myBaseStrategy: MatrixStrategy;
  oppBaseStrategy: MatrixStrategy;
};
export const IDPGame = ({ myBaseStrategy, oppBaseStrategy }: IDPGameProps) => {
  const [myScore, setMyScore] = useState<number[]>([]);
  const [oppScore, setOppScore] = useState<number[]>([]);
  const [myStrategy, setMyStrategy] = useState<MatrixStrategy>(myBaseStrategy);
  const [oppStrategy, setOppStrategy] =
    useState<MatrixStrategy>(oppBaseStrategy);

  const [myDecisions, setMyDecisions] = useState<Decision[]>([]);
  const [oppDecisions, setOppDecisions] = useState<Decision[]>([]);

  const reset = () => {
    setMyScore([]);
    setOppScore([]);
    setMyDecisions([]);
    setOppDecisions([]);
  };
  const playOneTurn = () => {
    const { me, opp } = playNextTurn(
      myStrategy,
      oppStrategy,
      myDecisions.at(-1) ?? "coop",
      oppDecisions.at(-1) ?? "coop"
    );
    setMyScore((myScore) => [...myScore, gains[me][opp]]);
    setOppScore((oppScore) => [...oppScore, gains[opp][me]]);
    setMyDecisions((myDecisions) => [...myDecisions, me]);
    setOppDecisions((oppDecisions) => [...oppDecisions, opp]);
  };

  const playTurns = async (turns: number) => {
    if (turns < 1) {
      console.error("Turns must be greater than 0");
      return;
    }
    for (let i = 0; i < turns; i++) {
      playOneTurn();
      await new Promise((resolve) => setTimeout(resolve, 1000 / turns));
    }
  };

  return (
    <div className="IDPGame">
      <h1> IDP Game </h1>

      <div className="flex flex-col md:flex-row w-full gap-2 justify-between">
        <StratTable
          playerName="My"
          strategy={myStrategy}
          setStrategy={setMyStrategy}
          resetStrategy={() => setMyStrategy(myBaseStrategy)}
        />
        <StratTable
          playerName="Opponent"
          strategy={oppStrategy}
          setStrategy={setOppStrategy}
          resetStrategy={() => setOppStrategy(oppBaseStrategy)}
        />
      </div>

      {myDecisions.length > 0 && oppDecisions.length > 0 && (
        <div className="flex flex-col md:flex-row w-full gap-2 justify-between">
          <p>
            <p>
              {myDecisions.at(-1) === "coop" ? "Cooperate 🤗" : "Betray 🔪"}
            </p>
            <p>
              10 last turns:{" "}
              {myDecisions
                .slice(-10)
                .map((d) => asEmoji(d))
                .join(" ")}
            </p>
            <p>
              <span>{myScore.reduce((acc, score) => acc + score, 0)}</span>
              <span>
                {" "}
                (+
                {
                  gains[myDecisions.at(-1) as Decision][
                    oppDecisions.at(-1) as Decision
                  ]
                }
                ){" "}
              </span>
              <span>- mean: {roundedMean(myScore)}</span>
            </p>
          </p>
          <p>
            <p>
              {oppDecisions.at(-1) === "coop" ? "Cooperate 🤗" : "Betray 🔪"}
            </p>
            10 last turns:{" "}
            {oppDecisions
              .slice(-10)
              .map((d) => asEmoji(d))
              .join(" ")}
            <p>
              <span>{oppScore.reduce((acc, score) => acc + score, 0)}</span>
              <span>
                {" "}
                (+
                {
                  gains[oppDecisions.at(-1) as Decision][
                    myDecisions.at(-1) as Decision
                  ]
                }
                ){" "}
              </span>
              <span>- mean: {roundedMean(oppScore)}</span>
            </p>
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={() => reset()}>Reset</button>
        <button onClick={() => playOneTurn()}>Play 1 Turn</button>
        <button onClick={() => playTurns(10)}>Play 10 Turns</button>
        <button onClick={() => playTurns(100)}>Play 100 Turns</button>
        <button onClick={() => playTurns(1000)}>Play 1000 Turns</button>
      </div>
      <p>Turns: {myScore.length}</p>
      <p>
        Total gains:{" "}
        {myScore.reduce((acc, score) => acc + score, 0) +
          oppScore.reduce((acc, score) => acc + score, 0)}
      </p>
      <p>Mean gains: {roundedMean([...myScore, ...oppScore])}</p>
    </div>
  );
};
