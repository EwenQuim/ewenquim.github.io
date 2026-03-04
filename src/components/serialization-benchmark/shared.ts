import protobuf from "protobufjs";

export const PROTO_DEF = `
syntax = "proto3";
message Product {
  int32  id          = 1;
  string name        = 2;
  double price       = 3;
  string description = 4;
  string category    = 5;
  bool   in_stock    = 6;
}
message ProductList {
  repeated Product products = 1;
}
`;

let _root: protobuf.Root | null = null;
export function getRoot(): protobuf.Root {
	if (!_root) _root = protobuf.parse(PROTO_DEF).root;
	return _root;
}

const CATEGORIES = [
	"Electronics",
	"Clothing",
	"Books",
	"Food",
	"Sports",
	"Home",
	"Garden",
	"Toys",
	"Automotive",
	"Health",
];
const SESSION_SEED = (Math.random() * 2 ** 32) >>> 0;

function makeItemPrng(itemIndex: number): () => number {
	let s = (SESSION_SEED ^ Math.imul(itemIndex + 1, 2654435761)) >>> 0;
	return (): number => {
		s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
		return s / 0x100000000;
	};
}

const STRING_LEN = 30;

function seededString(seed: number): string {
	let s = (seed * 2654435761) >>> 0;
	function next(): number {
		s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
		return s / 0x100000000;
	}
	const chars: string[] = [];
	for (let i = 0; i < STRING_LEN; i++) {
		const isSpace = i > 0 && i < STRING_LEN - 1 && next() < 1 / 6;
		const code = Math.floor(next() * 52);
		chars.push(isSpace ? " " : String.fromCharCode(code < 26 ? 65 + code : 97 + (code - 26)));
	}
	return chars.join("");
}

export type Repeatability = "unique" | "mixed" | "repetitive";

const FIXED_NAME_PREFIX = seededString(1);
const FIXED_DESC = seededString(100);

function randomString(rng: () => number): string {
	const chars: string[] = [];
	for (let i = 0; i < STRING_LEN; i++) {
		const isSpace = i > 0 && i < STRING_LEN - 1 && rng() < 1 / 6;
		const code = Math.floor(rng() * 52);
		chars.push(isSpace ? " " : String.fromCharCode(code < 26 ? 65 + code : 97 + (code - 26)));
	}
	return chars.join("");
}

export function generateProducts(
	n: number,
	repeatability: Repeatability = "unique",
): object[] {
	return Array.from({ length: n }, (_, i) => {
		const rng = makeItemPrng(i);
		let name: string;
		let description: string;

		if (repeatability === "unique") {
			name = `${randomString(rng)} item #${i + 1}`;
			description = randomString(rng);
		} else if (repeatability === "mixed") {
			name = `${randomString(rng)} item #${i + 1}`;
			description = FIXED_DESC;
		} else {
			name = `${FIXED_NAME_PREFIX} item #${i + 1}`;
			description = FIXED_DESC;
		}

		return {
			id: i + 1,
			name,
			price: Math.round((rng() * 499.98 + 0.01) * 100) / 100,
			description,
			category: CATEGORIES[Math.floor(rng() * CATEGORIES.length)],
			in_stock: rng() > 0.25,
		};
	});
}

export function toProtoBytes(products: object[]): Uint8Array {
	const root = getRoot();
	const ProductList = root.lookupType("ProductList");
	const msg = ProductList.create({ products });
	return ProductList.encode(msg).finish();
}

async function readAllChunks(
	readable: ReadableStream<Uint8Array>,
): Promise<Uint8Array> {
	const chunks: Uint8Array[] = [];
	const reader = readable.getReader();
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		chunks.push(value);
	}
	const total = chunks.reduce((sum, c) => sum + c.byteLength, 0);
	const result = new Uint8Array(total);
	let offset = 0;
	for (const chunk of chunks) {
		result.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return result;
}

/** Returns compressed Uint8Array. */
export async function gzipRaw(data: Uint8Array): Promise<Uint8Array> {
	const cs = new CompressionStream("gzip");
	const writer = cs.writable.getWriter();
	writer.write(data);
	writer.close();
	return readAllChunks(cs.readable);
}

/** Returns compressed byte count. */
export async function gzipSize(data: Uint8Array): Promise<number> {
	return (await gzipRaw(data)).byteLength;
}

/** Returns decompressed Uint8Array. */
export async function gzipDecompress(data: Uint8Array): Promise<Uint8Array> {
	const ds = new DecompressionStream("gzip");
	const writer = ds.writable.getWriter();
	writer.write(data);
	writer.close();
	return readAllChunks(ds.readable);
}

/** Compact byte formatter for chart axis labels. */
export function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes}B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}K`;
	return `${(bytes / (1024 * 1024)).toFixed(1)}M`;
}

export type Sizes = {
	json: number;
	proto: number;
	jsonGz: number;
	protoGz: number;
};

export async function computeSizes(
	n: number,
	repeatability: Repeatability = "unique",
): Promise<Sizes> {
	const products = generateProducts(n, repeatability);
	const jsonBytes = new TextEncoder().encode(JSON.stringify(products));
	const protoBytes = toProtoBytes(products);
	const [jsonGz, protoGz] = await Promise.all([
		gzipSize(jsonBytes),
		gzipSize(protoBytes),
	]);
	return {
		json: jsonBytes.byteLength,
		proto: protoBytes.byteLength,
		jsonGz,
		protoGz,
	};
}

export const SAMPLE_COUNTS = [1, 5, 10, 25, 50, 100, 200, 400, 800, 2000, 5000];
