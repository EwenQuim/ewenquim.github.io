import { useEffect, useState } from "react";
import { StratTable } from "./StratTable";
import { roundedMean } from "../../utils/maths";
import {
  type Decision,
  asEmoji,
  PrisonersDilemmaStrategy,
  defaultGains,
  strategyNames,
  strategies,
} from "./prisonersDilemma";
import { Score } from "./Score";

const playNextTurn = (
  myStrategy: PrisonersDilemmaStrategy,
  oppStrategy: PrisonersDilemmaStrategy,
  myPreviousDecision: Decision | undefined,
  oppPreviousDecision: Decision | undefined
): { me: Decision; opp: Decision } => {
  if (myPreviousDecision === undefined || oppPreviousDecision === undefined) {
    return { me: myStrategy.firstMove, opp: oppStrategy.firstMove };
  }

  const myProb = Math.random() * 100;
  const oppProb = Math.random() * 100;

  const myDecision =
    myProb <
    myStrategy.strategy[
      myPreviousDecision == "coop"
        ? "previousTurnICoop"
        : "previousTurnIBetrayed"
    ][oppPreviousDecision]
      ? "coop"
      : "betray";

  const oppDecision =
    oppProb <
    oppStrategy.strategy[
      myPreviousDecision == "coop"
        ? "previousTurnICoop"
        : "previousTurnIBetrayed"
    ][myPreviousDecision]
      ? "coop"
      : "betray";

  return { me: myDecision, opp: oppDecision };
};

type IDPGameProps = {
  myBaseStrategy: PrisonersDilemmaStrategy | strategyNames;
  oppBaseStrategy: PrisonersDilemmaStrategy | strategyNames;
  gainsMatrix?: typeof defaultGains;
};
export const IDPGame = ({
  myBaseStrategy,
  oppBaseStrategy,
  gainsMatrix = defaultGains,
}: IDPGameProps) => {
  const [myScore, setMyScore] = useState<number[]>([]);
  const [oppScore, setOppScore] = useState<number[]>([]);
  const [myStrategy, setMyStrategy] = useState<PrisonersDilemmaStrategy>(
    typeof myBaseStrategy !== "string"
      ? myBaseStrategy
      : strategies[myBaseStrategy]
  );
  const [oppStrategy, setOppStrategy] = useState<PrisonersDilemmaStrategy>(
    typeof oppBaseStrategy !== "string"
      ? oppBaseStrategy
      : strategies[oppBaseStrategy]
  );

  const [myDecisions, setMyDecisions] = useState<Decision[]>([]);
  const [oppDecisions, setOppDecisions] = useState<Decision[]>([]);

  const [remainingTurns, setRemainingTurns] = useState<number>(0);

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
      myDecisions.at(-1),
      oppDecisions.at(-1)
    );
    setMyScore((myScore) => [...myScore, defaultGains[me][opp]]);
    setOppScore((oppScore) => [...oppScore, defaultGains[opp][me]]);
    setMyDecisions((myDecisions) => [...myDecisions, me]);
    setOppDecisions((oppDecisions) => [...oppDecisions, opp]);
  };

  const play = async () => {
    if (remainingTurns > 0) {
      playOneTurn();
      if (remainingTurns < 100) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 / (remainingTurns + 4))
        );
      }

      setRemainingTurns((remainingTurns) => remainingTurns - 1);
    }
  };

  useEffect(() => {
    play();
  }, [remainingTurns]);

  return (
    <div className="IDPGame">
      <h1> IDP Game </h1>

      <div className="flex flex-col md:flex-row w-full gap-2 justify-between">
        <div className="flex flex-col shadow bg-white rounded-lg p-2 w-full">
          <StratTable
            playerName="My"
            strategy={myStrategy}
            setStrategy={setMyStrategy}
            resetStrategy={() =>
              setMyStrategy(
                typeof myBaseStrategy !== "string"
                  ? myBaseStrategy
                  : strategies[myBaseStrategy]
              )
            }
          />
          <Score scores={myScore} decisions={myDecisions} />
        </div>
        <div className="shadow bg-white rounded-lg p-2 w-full">
          <StratTable
            playerName="Opponent"
            strategy={oppStrategy}
            setStrategy={setOppStrategy}
            resetStrategy={() =>
              setOppStrategy(
                typeof oppBaseStrategy !== "string"
                  ? oppBaseStrategy
                  : strategies[oppBaseStrategy]
              )
            }
          />
          <Score scores={oppScore} decisions={oppDecisions} />
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <button onClick={() => reset()}>Reset</button>
        <button onClick={() => playOneTurn()}>Play 1 Turn</button>
        <button onClick={() => setRemainingTurns(10)}>Play 10 Turns</button>
        <button onClick={() => setRemainingTurns(100)}>Play 100 Turns</button>
        <button onClick={() => setRemainingTurns(1000)}>Play 1000 Turns</button>
        <button onClick={() => setRemainingTurns(10000)}>Play 10k Turns</button>
      </div>
      <p className="flex gap-4 justify-between">
        Turns: {myScore.length}
        <span>
          Total gains:{" "}
          {[...myScore, ...oppScore].reduce((acc, score) => acc + score, 0)}
        </span>
        {myScore.length > 0 && (
          <span>Mean gains: {roundedMean([...myScore, ...oppScore])}</span>
        )}
      </p>
    </div>
  );
};
