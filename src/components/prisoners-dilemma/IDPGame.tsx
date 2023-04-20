import { useEffect, useState } from "react";
import { StratTable } from "./StratTable";
import { roundedMean } from "../../utils/maths";
import {
  type Decision,
  asEmoji,
  PrisonersDilemmaStrategy,
  defaultGains,
} from "./prisonersDilemma";

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
  myBaseStrategy: PrisonersDilemmaStrategy;
  oppBaseStrategy: PrisonersDilemmaStrategy;
  gainsMatrix?: typeof defaultGains;
};
export const IDPGame = ({
  myBaseStrategy,
  oppBaseStrategy,
  gainsMatrix = defaultGains,
}: IDPGameProps) => {
  const [myScore, setMyScore] = useState<number[]>([]);
  const [oppScore, setOppScore] = useState<number[]>([]);
  const [myStrategy, setMyStrategy] =
    useState<PrisonersDilemmaStrategy>(myBaseStrategy);
  const [oppStrategy, setOppStrategy] =
    useState<PrisonersDilemmaStrategy>(oppBaseStrategy);

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

      <div className="flex gap-2">
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
        <span>Mean gains: {roundedMean([...myScore, ...oppScore])}</span>
      </p>

      {myDecisions.length > 0 && oppDecisions.length > 0 && (
        <div className="flex flex-col md:flex-row w-full gap-2 justify-between">
          <div>
            <p>
              {myDecisions.at(-1) === "coop" ? "🤗 Cooperate" : "🔪 Betray"}
            </p>
            <p>
              Last 10:{" "}
              {myDecisions
                .slice(-10)
                .map((d) => asEmoji(d))
                .join(" ")}
            </p>
            <p>
              <span>{myScore.reduce((acc, score) => acc + score, 0)}</span>
              <span> (+{myScore.at(-1)})</span>
              <span> - mean: {roundedMean(myScore)}</span>
            </p>
          </div>
          <div>
            <p>
              {oppDecisions.at(-1) === "coop" ? "🤗 Cooperate" : "🔪 Betray"}
            </p>
            <p>
              Last 10:{" "}
              {oppDecisions
                .slice(-10)
                .map((d) => asEmoji(d))
                .join(" ")}
            </p>
            <p>
              <span>{oppScore.reduce((acc, score) => acc + score, 0)}</span>
              <span> (+ {oppScore.at(-1)})</span>
              <span> - mean: {roundedMean(oppScore)}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
