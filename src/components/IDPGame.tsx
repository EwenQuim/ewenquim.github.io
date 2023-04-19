import { useState } from "react";
import { StratTable } from "./StratTable";

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
      ? "betray"
      : "coop";

  const oppDecision =
    oppProb < oppStrategy.previousTurnIBetrayed[myPreviousDecision]
      ? "betray"
      : "coop";

  return { me: myDecision, opp: oppDecision };
};

type IDPGameProps = {
  myBaseStrategy: MatrixStrategy;
  oppBaseStrategy: MatrixStrategy;
};
export const IDPGame = ({ myBaseStrategy, oppBaseStrategy }: IDPGameProps) => {
  const [myScore, setMyScore] = useState<number[]>([0]);
  const [oppScore, setOppScore] = useState<number[]>([0]);
  const [myStrategy, setMyStrategy] = useState<MatrixStrategy>(myBaseStrategy);
  const [oppStrategy, setOppStrategy] =
    useState<MatrixStrategy>(oppBaseStrategy);

  const [myLastDecision, setMyLastDecision] = useState<Decision>("coop");
  const [oppLastDecision, setOppLastDecision] = useState<Decision>("coop");

  const reset = () => {
    setMyScore([0]);
    setOppScore([0]);
    setMyLastDecision("coop");
    setOppLastDecision("coop");
  };
  const playOneTurn = () => {
    const { me, opp } = playNextTurn(
      myStrategy,
      oppStrategy,
      myLastDecision,
      oppLastDecision
    );
    setMyScore((myScore) => [...myScore, gains[me][opp]]);
    setOppScore((oppScore) => [...oppScore, gains[opp][me]]);
    setMyLastDecision(me);
    setOppLastDecision(opp);
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

      <div className="flex flex-col md:flex-row">
        <StratTable
          playerName="My"
          strategy={myStrategy}
          setStrategy={setMyStrategy}
        />
        <StratTable
          playerName="Opponent"
          strategy={oppStrategy}
          setStrategy={setOppStrategy}
        />
      </div>

      <div>
        <p>
          My Decision: {myLastDecision}
          <span> (+ {gains[myLastDecision][oppLastDecision]}) </span>
          <span>- total :{myScore.reduce((acc, score) => acc + score, 0)}</span>
          <span>
            - mean:{" "}
            {myScore.reduce((acc, score) => acc + score, 0) / myScore.length}
          </span>
        </p>
        <p>
          Opp Decision: {oppLastDecision}
          <span> (+{gains[oppLastDecision][myLastDecision]}) </span>
          <span>
            - total :{oppScore.reduce((acc, score) => acc + score, 0)}
          </span>
          <span>
            - mean:{" "}
            {oppScore.reduce((acc, score) => acc + score, 0) / oppScore.length}
          </span>
        </p>
      </div>

      <div className="flex gap-2">
        <button onClick={() => reset()}>Reset</button>
        <button onClick={() => playOneTurn()}>Play 1 Turn</button>
        <button onClick={() => playTurns(10)}>Play 10 Turns</button>
        <button onClick={() => playTurns(100)}>Play 100 Turns</button>
        <button onClick={() => playTurns(1000)}>Play 1000 Turns</button>
      </div>
      <p>Turns: {myScore.length}</p>
    </div>
  );
};
