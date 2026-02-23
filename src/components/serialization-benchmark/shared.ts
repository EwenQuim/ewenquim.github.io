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
const ADJECTIVES = [
	"durable",
	"comfortable",
	"stylish",
	"innovative",
	"reliable",
	"efficient",
	"powerful",
	"versatile",
	"eco-friendly",
	"ergonomic",
	"compact",
	"premium",
	"lightweight",
	"robust",
	"flexible",
];
const MATERIALS = [
	"aluminum",
	"cotton",
	"leather",
	"plastic",
	"wood",
	"steel",
	"ceramic",
	"glass",
	"rubber",
	"fabric",
];

function rnd<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

function sku(): string {
	return `${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0").toUpperCase()}-${Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0").toUpperCase()}`;
}

export function generateProducts(n: number): object[] {
	return Array.from({ length: n }, (_, i) => ({
		id: i + 1,
		name: `${rnd(ADJECTIVES)} ${rnd(MATERIALS)} item #${i + 1}`,
		price: Math.round((Math.random() * 499.98 + 0.01) * 100) / 100,
		description: `SKU-${sku()} · ${rnd(ADJECTIVES)} ${rnd(MATERIALS)}, lot #${Math.floor(Math.random() * 999999)}`,
		category: rnd(CATEGORIES),
		in_stock: Math.random() > 0.25,
	}));
}

export function toProtoBytes(products: object[]): Uint8Array {
	const root = getRoot();
	const ProductList = root.lookupType("ProductList");
	const msg = ProductList.create({ products });
	return ProductList.encode(msg).finish();
}

async function readAllChunks(readable: ReadableStream<Uint8Array>): Promise<Uint8Array> {
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

export async function computeSizes(n: number): Promise<Sizes> {
	const products = generateProducts(n);
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
