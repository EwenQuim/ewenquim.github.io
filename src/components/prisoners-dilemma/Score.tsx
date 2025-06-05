import { roundedMean } from "../../utils/maths";
import { type Decision, asEmoji } from "./prisonersDilemma";

type ScoreProps = {
	decisions: Decision[];
	scores: number[];
};
export const Score = ({ decisions, scores }: ScoreProps) => {
	if (decisions.length === 0) {
		return null;
	}

	return (
		<div className="text-center">
			{decisions.length > 0 && (
				<p>{decisions.at(-1) === "coop" ? "🤗 Cooperate" : "🔪 Betray"}</p>
			)}

			<p>
				{decisions
					.slice(-10)
					.map((d) => asEmoji(d))
					.join(" ")}
			</p>
			<p>
				<span>{scores.reduce((acc, score) => acc + score, 0)}</span>
				<span> (+{scores.at(-1)})</span>
				<span> - mean: {roundedMean(scores)}</span>
			</p>
		</div>
	);
};
