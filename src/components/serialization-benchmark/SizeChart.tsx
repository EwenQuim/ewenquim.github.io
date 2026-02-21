import { useEffect, useState } from "react";
import { SAMPLE_COUNTS, computeSizes } from "./shared";
import type { Sizes } from "./shared";

type Point = { count: number; sizes: Sizes };

const COLORS: Record<keyof Sizes, string> = {
	json: "#fde68a",
	proto: "#fdba74",
	jsonGz: "#f59e0b",
	protoGz: "#ea580c",
};

const LABELS: Record<keyof Sizes, string> = {
	json: "JSON",
	proto: "Protobuf",
	jsonGz: "JSON + Gzip",
	protoGz: "Proto + Gzip",
};

const PAD_L = 52;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 52;
const W = 560;
const H = 260;
const chartW = W - PAD_L - PAD_R;
const chartH = H - PAD_T - PAD_B;

function xScale(n: number): number {
	return (Math.log10(n) / Math.log10(5000)) * chartW + PAD_L;
}

function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes}B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}K`;
	return `${(bytes / (1024 * 1024)).toFixed(1)}M`;
}

const X_TICKS = [1, 10, 100, 500, 1000, 2000, 5000];

export function SizeChart() {
	const [points, setPoints] = useState<Point[] | null>(null);

	useEffect(() => {
		Promise.all(
			SAMPLE_COUNTS.map(async (count) => ({
				count,
				sizes: await computeSizes(count),
			})),
		).then(setPoints);
	}, []);

	const maxBytes = points
		? Math.max(...points.flatMap((p) => Object.values(p.sizes) as number[]))
		: 100_000;

	function yScale(bytes: number): number {
		return PAD_T + chartH - (bytes / maxBytes) * chartH;
	}

	const yTicks = Array.from({ length: 5 }, (_, i) => (maxBytes * (i + 1)) / 5);

	function polylinePoints(key: keyof Sizes): string {
		if (!points) return "";
		return points
			.map(
				(p) =>
					`${xScale(p.count).toFixed(1)},${yScale(p.sizes[key]).toFixed(1)}`,
			)
			.join(" ");
	}

	const keys = Object.keys(COLORS) as (keyof Sizes)[];

	return (
		<div className="not-prose my-8 p-4 rounded-lg bg-bg-card dark:bg-bg-card-dark border border-border-color dark:border-border-color-dark">
			<p className="text-sm font-semibold text-text-primary dark:text-text-primary-dark mb-2">
				Payload Size vs Record Count
			</p>
			<svg
				viewBox={`0 0 ${W} ${H}`}
				width="100%"
				aria-label="Payload size by record count"
				className="text-text-primary dark:text-text-primary-dark"
			>
				{/* Dashed grid lines */}
				{yTicks.map((v) => (
					<line
						key={v}
						x1={PAD_L}
						y1={yScale(v).toFixed(1)}
						x2={PAD_L + chartW}
						y2={yScale(v).toFixed(1)}
						stroke="currentColor"
						strokeOpacity="0.1"
						strokeDasharray="4,4"
					/>
				))}
				{X_TICKS.map((n) => (
					<line
						key={n}
						x1={xScale(n).toFixed(1)}
						y1={PAD_T}
						x2={xScale(n).toFixed(1)}
						y2={PAD_T + chartH}
						stroke="currentColor"
						strokeOpacity="0.1"
						strokeDasharray="4,4"
					/>
				))}

				{/* Axes */}
				<line
					x1={PAD_L}
					y1={PAD_T}
					x2={PAD_L}
					y2={PAD_T + chartH}
					stroke="currentColor"
					strokeOpacity="0.3"
				/>
				<line
					x1={PAD_L}
					y1={PAD_T + chartH}
					x2={PAD_L + chartW}
					y2={PAD_T + chartH}
					stroke="currentColor"
					strokeOpacity="0.3"
				/>

				{/* Y-axis tick labels */}
				{yTicks.map((v) => (
					<text
						key={v}
						x={PAD_L - 5}
						y={yScale(v).toFixed(1)}
						textAnchor="end"
						dominantBaseline="middle"
						fontSize="10"
						fill="currentColor"
						fillOpacity="0.55"
					>
						{formatBytes(v)}
					</text>
				))}

				{/* X-axis tick labels */}
				{X_TICKS.map((n) => (
					<text
						key={n}
						x={xScale(n).toFixed(1)}
						y={PAD_T + chartH + 14}
						textAnchor="middle"
						fontSize="10"
						fill="currentColor"
						fillOpacity="0.55"
					>
						{n}
					</text>
				))}

				{/* Skeleton or data lines */}
				{!points ? (
					<rect
						x={PAD_L}
						y={PAD_T}
						width={chartW}
						height={chartH}
						className="fill-white/10 animate-pulse"
						rx="4"
					/>
				) : (
					keys.map((key) => (
						<polyline
							key={key}
							points={polylinePoints(key)}
							fill="none"
							stroke={COLORS[key]}
							strokeWidth="2"
							strokeLinejoin="round"
							strokeLinecap="round"
						/>
					))
				)}

				{/* Legend — single row below x-axis */}
				{keys.map((key, i) => (
					<g key={key} transform={`translate(${PAD_L + i * 122}, ${H - 14})`}>
						<line
							x1="0"
							y1="0"
							x2="14"
							y2="0"
							stroke={COLORS[key]}
							strokeWidth="2"
						/>
						<text
							x="18"
							y="0"
							dominantBaseline="middle"
							fontSize="10"
							fill="currentColor"
							fillOpacity="0.75"
						>
							{LABELS[key]}
						</text>
					</g>
				))}
			</svg>
			<p className="text-xs text-right text-text-secondary">
				X axis: record count (log scale) · Live-computed in your browser
			</p>
		</div>
	);
}
