import { useEffect, useState } from "react";
import {
	SAMPLE_COUNTS,
	generateProducts,
	toProtoBytes,
	gzipRaw,
	gzipDecompress,
	getRoot,
} from "./shared";
import type { Sizes } from "./shared";

type Timings = { json: number; proto: number; jsonGz: number; protoGz: number };
type Point = { count: number; timings: Timings; sizes: Sizes };

const BANDWIDTH_BPS = 10 * 1024 * 1024; // 10 Mbps WiFi

const COLORS: Record<keyof Timings, string> = {
	json: "#fde68a",
	proto: "#fdba74",
	jsonGz: "#f59e0b",
	protoGz: "#ea580c",
};

const LABELS: Record<keyof Timings, string> = {
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

function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes}B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}K`;
	return `${(bytes / (1024 * 1024)).toFixed(1)}M`;
}

async function computePoint(n: number): Promise<Point> {
	const root = getRoot();
	const ProductList = root.lookupType("ProductList");

	const products = generateProducts(n);
	const jsonStr = JSON.stringify(products);
	const jsonBytes = new TextEncoder().encode(jsonStr);
	const protoBytes = toProtoBytes(products);
	const jsonGzBytes = await gzipRaw(jsonBytes);
	const protoGzBytes = await gzipRaw(protoBytes);

	const sizes: Sizes = {
		json: jsonBytes.byteLength,
		proto: protoBytes.byteLength,
		jsonGz: jsonGzBytes.byteLength,
		protoGz: protoGzBytes.byteLength,
	};

	// Network times (based on each format's actual size)
	const nJson = (sizes.json / BANDWIDTH_BPS) * 1000;
	const nProto = (sizes.proto / BANDWIDTH_BPS) * 1000;
	const nJsonGz = (sizes.jsonGz / BANDWIDTH_BPS) * 1000;
	const nProtoGz = (sizes.protoGz / BANDWIDTH_BPS) * 1000;

	// Processing times (measured)
	let t0: number, t1: number;

	t0 = performance.now();
	JSON.parse(jsonStr);
	t1 = performance.now();
	const pJson = t1 - t0;

	t0 = performance.now();
	ProductList.decode(protoBytes);
	t1 = performance.now();
	const pProto = t1 - t0;

	t0 = performance.now();
	const djBytes = await gzipDecompress(jsonGzBytes);
	JSON.parse(new TextDecoder().decode(djBytes));
	t1 = performance.now();
	const pJsonGz = t1 - t0;

	t0 = performance.now();
	const dpBytes = await gzipDecompress(protoGzBytes);
	ProductList.decode(dpBytes);
	t1 = performance.now();
	const pProtoGz = t1 - t0;

	return {
		count: n,
		sizes,
		timings: {
			json: nJson + pJson,
			proto: nProto + pProto,
			jsonGz: nJsonGz + pJsonGz,
			protoGz: nProtoGz + pProtoGz,
		},
	};
}

export function DownloadTimeChart() {
	const [points, setPoints] = useState<Point[] | null>(null);

	useEffect(() => {
		Promise.all(SAMPLE_COUNTS.map(computePoint)).then(setPoints);
	}, []);

	const maxMs = points
		? Math.max(...points.flatMap((p) => Object.values(p.timings) as number[]))
		: 10;

	// X axis: log scale over JSON byte sizes (baseline reference)
	const minJsonSize = points ? points[0].sizes.json : 100;
	const maxJsonSize = points ? points[points.length - 1].sizes.json : 700_000;
	const logMin = Math.log10(minJsonSize);
	const logMax = Math.log10(maxJsonSize);

	function xScale(bytes: number): number {
		return ((Math.log10(bytes) - logMin) / (logMax - logMin)) * chartW + PAD_L;
	}

	// Pick X ticks: powers of 10 within range, plus a mid-range tick
	const xTickCandidates = [100, 500, 1_000, 5_000, 10_000, 50_000, 100_000, 500_000, 1_000_000];
	const xTicks = points
		? xTickCandidates.filter((v) => v >= minJsonSize * 0.8 && v <= maxJsonSize * 1.2)
		: [];

	function yScale(ms: number): number {
		return PAD_T + chartH - (ms / maxMs) * chartH;
	}

	const yTicks = Array.from({ length: 5 }, (_, i) => (maxMs * (i + 1)) / 5);

	function polylinePoints(key: keyof Timings): string {
		if (!points) return "";
		return points
			.map((p) => `${xScale(p.sizes.json).toFixed(1)},${yScale(p.timings[key]).toFixed(1)}`)
			.join(" ");
	}

	const keys = Object.keys(COLORS) as (keyof Timings)[];

	return (
		<div className="not-prose my-8 p-4 rounded-lg bg-bg-card dark:bg-bg-card-dark border border-border-color dark:border-border-color-dark">
			<p className="text-sm font-semibold text-text-primary dark:text-text-primary-dark mb-2">
				Estimated Download + Parse Time vs Payload Size
			</p>
			<svg
				viewBox={`0 0 ${W} ${H}`}
				width="100%"
				aria-label="Download and parse time by payload size"
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
				{xTicks.map((v) => (
					<line
						key={v}
						x1={xScale(v).toFixed(1)}
						y1={PAD_T}
						x2={xScale(v).toFixed(1)}
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
						{v < 1 ? v.toFixed(2) : v < 10 ? v.toFixed(1) : v.toFixed(0)}ms
					</text>
				))}

				{/* X-axis tick labels */}
				{xTicks.map((v) => (
					<text
						key={v}
						x={xScale(v).toFixed(1)}
						y={PAD_T + chartH + 14}
						textAnchor="middle"
						fontSize="10"
						fill="currentColor"
						fillOpacity="0.55"
					>
						{formatBytes(v)}
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
						<line x1="0" y1="0" x2="14" y2="0" stroke={COLORS[key]} strokeWidth="2" />
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
				X axis: JSON payload size (log scale) · Network: 10 Mbps assumed · Processing: measured in your browser
			</p>
		</div>
	);
}
