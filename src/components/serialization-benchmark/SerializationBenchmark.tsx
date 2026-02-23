import { useEffect, useState } from "react";
import { computeSizes } from "./shared";
import type { Sizes } from "./shared";

function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getSavings(bytes: number, baseline: number): number {
	return ((baseline - bytes) / baseline) * 100;
}

type Row = { key: keyof Sizes; label: string; color: string };

const ROWS: Row[] = [
	{ key: "json", label: "JSON", color: "bg-amber-200" },
	{ key: "proto", label: "Protobuf", color: "bg-orange-300" },
	{ key: "jsonGz", label: "JSON + Gzip", color: "bg-amber-500" },
	{ key: "protoGz", label: "Proto + Gzip", color: "bg-orange-600" },
];

function getInsight(sizes: Sizes): {
	type: "warning" | "info";
	message: string;
} {
	if (sizes.jsonGz > sizes.json) {
		return {
			type: "warning",
			message:
				"Gzip is adding overhead at this size. The fixed header makes compressed JSON larger than plain JSON — skip compression for tiny payloads.",
		};
	}
	if (sizes.jsonGz < sizes.proto) {
		return {
			type: "info",
			message:
				"JSON + Gzip beats plain Protobuf here. Compression more than compensates for JSON's verbosity at this payload size.",
		};
	}
	const diff = getSavings(sizes.protoGz, sizes.jsonGz);
	if (diff <= 0) {
		return {
			type: "info",
			message:
				"JSON + Gzip and Proto + Gzip are nearly identical here. Enable Gzip—format choice barely matters at this size.",
		};
	}
	return {
		type: "info",
		message: `Proto + Gzip is ${diff.toFixed(0)}% smaller than JSON + Gzip. At scale (millions of requests/day) this becomes real bandwidth savings.`,
	};
}

export function SerializationBenchmark() {
	const [count, setCount] = useState(500);
	const [sizes, setSizes] = useState<Sizes | null>(null);
	const [computing, setComputing] = useState(false);

	useEffect(() => {
		const id = setTimeout(async () => {
			setComputing(true);
			try {
				setSizes(await computeSizes(count));
			} finally {
				setComputing(false);
			}
		}, 150);
		return () => clearTimeout(id);
	}, [count]);

	const maxBytes = sizes
		? Math.max(sizes.json, sizes.proto, sizes.jsonGz, sizes.protoGz)
		: 1;
	const insight = sizes ? getInsight(sizes) : null;

	return (
		<div className="not-prose my-8 p-4 rounded-lg bg-bg-card dark:bg-bg-card-dark border border-border-color dark:border-border-color-dark">
			{/* Header with slider */}
			<div className="flex flex-wrap items-center gap-3 mb-4">
				<span className="text-sm font-medium text-text-primary dark:text-text-primary-dark w-24 shrink-0">
					{count} record{count !== 1 ? "s" : ""}
				</span>
				<input
					type="range"
					min={1}
					max={10000}
					value={count}
					onChange={(e) => setCount(+e.target.value)}
					className="flex-1 accent-orange-500 cursor-pointer"
				/>
				<span className="text-xs text-text-secondary w-12 text-right shrink-0">
					/ 10000
				</span>
			</div>

			{/* Insight banner */}
			{insight && (
				<div
					className={`mb-4 px-3 py-2 rounded text-sm ${
						insight.type === "warning"
							? "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700"
							: "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700"
					}`}
				>
					{insight.type === "warning" ? "⚠️ " : "💡 "}
					{insight.message}
				</div>
			)}
			{!insight && !computing && <div className="mb-4 h-10" />}
			{!insight && computing && (
				<div className="mb-4 px-3 py-2 rounded text-sm bg-white/10 dark:bg-white/5 h-10 animate-pulse" />
			)}

			{/* Bar chart */}
			<div className="flex flex-col gap-3">
				{ROWS.map(({ key, label, color }) => {
					const bytes = sizes?.[key] ?? 0;
					const percent = sizes ? (bytes / maxBytes) * 100 : 0;
					const savings = sizes ? getSavings(bytes, sizes.json) : 0;
					const isBaseline = key === "json";

					return (
						<div key={key} className="flex items-center gap-2">
							{/* Label */}
							<span className="w-28 text-right text-sm font-medium text-text-primary dark:text-text-primary-dark shrink-0">
								{label}
							</span>

							{/* Bar */}
							<div className="flex-1 bg-white/20 dark:bg-white/5 rounded h-6 overflow-hidden">
								{computing || !sizes ? (
									<div
										className="h-full rounded bg-white/20 animate-pulse"
										style={{ width: "60%" }}
									/>
								) : (
									<div
										className={`h-full rounded transition-all duration-500 ${color}`}
										style={{ width: `${percent}%` }}
									/>
								)}
							</div>

							{/* Bytes + savings badge */}
							<div className="w-36 shrink-0 flex items-center gap-1.5">
								{computing || !sizes ? (
									<div className="h-4 w-20 rounded bg-white/20 animate-pulse" />
								) : (
									<>
										<span className="text-sm font-mono text-text-primary dark:text-text-primary-dark">
											{formatBytes(bytes)}
										</span>
										{isBaseline ? (
											<span className="text-xs px-1.5 py-0.5 rounded bg-white/30 dark:bg-white/10 text-text-secondary">
												baseline
											</span>
										) : savings > 0 ? (
											<span className="text-xs px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
												↓ {savings.toFixed(0)}%
											</span>
										) : (
											<span className="text-xs px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
												↑ {Math.abs(savings).toFixed(0)}% larger
											</span>
										)}
									</>
								)}
							</div>
						</div>
					);
				})}
			</div>

			{/* Legend */}
			<p className="mt-4 text-xs text-text-secondary text-right">
				Live-computed in your browser · savings relative to plain JSON
			</p>
		</div>
	);
}
