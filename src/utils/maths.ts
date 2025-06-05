export const roundedMean = (arr: number[]) => {
	const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
	return Math.round(mean * 100) / 100;
};
