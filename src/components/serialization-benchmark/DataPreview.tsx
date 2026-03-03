import { useEffect, useState } from "react";
import { generateProducts } from "./shared";
import type { Repeatability } from "./shared";

export function DataPreview() {
	const [repeatability, setRepeatability] = useState<Repeatability>("unique");
	const [data, setData] = useState<string>("");

	useEffect(() => {
		setData(JSON.stringify(generateProducts(10, repeatability), null, 2));
	}, [repeatability]);

	return (
		<details className="not-prose my-4 rounded-lg bg-bg-card dark:bg-bg-card-dark border border-border-color dark:border-border-color-dark">
			<summary className="cursor-pointer px-4 py-3 text-sm font-medium text-text-primary dark:text-text-primary-dark select-none">
				Inspect sample data
			</summary>
			<div className="px-4 pt-2 pb-3 flex flex-wrap items-center gap-3">
				<span className="text-sm font-medium text-text-primary dark:text-text-primary-dark w-24 shrink-0">
					Repetition
				</span>
				<div className="flex gap-2">
					{(["unique", "mixed", "repetitive"] as Repeatability[]).map(
						(level) => (
							<button
								key={level}
								type="button"
								onClick={() => setRepeatability(level)}
								className={`px-3 py-1 text-sm rounded border transition-colors ${
									repeatability === level
										? "bg-orange-500 text-white border-orange-500"
										: "text-text-secondary dark:text-text-secondary-dark border-border-color dark:border-border-color-dark hover:border-orange-400"
								}`}
							>
								{level.charAt(0).toUpperCase() + level.slice(1)}
							</button>
						),
					)}
				</div>
			</div>
			<pre className="overflow-x-auto px-4 pb-4 text-xs text-text-secondary dark:text-text-secondary-dark leading-relaxed">
				{data}
			</pre>
		</details>
	);
}
