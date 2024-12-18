////////////////////////// SUM ///////////////////////////////////////////////

export function sumInts(a: number, b: number): number {
  return (a > b) ? 0 : a + sumSquares(a + 1, b);
}

export function sumSquares(a: number, b: number): number {
  return (a > b) ? 0 : a * a + sumSquares(a + 1, b);
}

export function sumCubes(a: number, b: number): number {
  return (a > b) ? 0 : a * a * a + sumCubes(a + 1, b);
}

function factorial(a: number): number {
  return (a === 1 || a === 0) ? a : a * factorial(a - 1);
}

export function sumFactorial(a: number, b: number): number {
  return (a > b) ? 0 : factorial(a) + sumFactorial(a + 1, b);
}

const sumMap =
  (mapFn: (value: number) => number) =>
    (a: number, b: number): number =>
      (a > b) ? 0 : mapFn(a) + sumMap(mapFn)(a + 1, b);

export const sumInt2 = sumMap(x => x);
export const sumSquares2 = sumMap(x => x * x);
export const sumCubes2 = sumMap(x => x * x * x);
export const sumFactorial2 = sumMap(x => (x === 1 || x === 0) ? x : x * factorial(x - 1));


////////////////////////////////////// PRODUCT /////////////////////////////////////////////

export function prodInts(a: number, b: number): number {
  return (a > b) ? 1 : a * prodInts(a + 1, b);
}

export function prodSquares(a: number, b: number): number {
  return (a > b) ? 1 : a * a * prodSquares(a + 1, b);
}

export function prodCubes(a: number, b: number): number {
  return (a > b) ? 1 : a * a * a * prodCubes(a + 1, b);
}

export function prodFactorial(a: number, b: number): number {
  return (a > b) ? 1 : factorial(a) * prodFactorial(a + 1, b);
}

const prodMap =
  (mapFn: (value: number) => number) =>
    (a: number, b: number): number =>
      (a > b) ? 1 : mapFn(a) * prodMap(mapFn)(a + 1, b);

export const prodInt2 = prodMap(x => x);
export const prodSquares2 = prodMap(x => x * x);
export const prodCubes2 = prodMap(x => x * x * x);
export const prodFactorial2 = prodMap(x => (x === 1 || x === 0) ? x : x * factorial(x - 1));


//////////////////////////////////// MAP REDUCE///////////////////////////////////////////////

const mapReduce = (
  mapFn: (value: number) => number,
  reduceFn: (first: number, second: number) => number,
  zero: number
) =>
  (a: number, b: number): number =>
    (a > b) ? zero : reduceFn(mapFn(a), mapReduce(mapFn, reduceFn, zero)(a + 1, b));

const mapReduce2 =
  (reduceFn: (first: number, second: number) => number,
    zero: number) =>
    (mapFn: (value: number) => number) =>
      (a: number, b: number): number =>
        (a > b) ? zero : reduceFn(mapFn(a), mapReduce2(reduceFn, zero)(mapFn)(a + 1, b));

export const sumMap2 = mapReduce2((x, y) => x + y, 0);
export const prodMap2 = mapReduce2((x, y) => x * y, 1);
