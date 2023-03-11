/**
 * 0 から `length` まで（ `length` の値は含まない）の配列を作成する。
 *
 * @remarks
 * `length` に負の値を指定すると長さ 0 の配列を作成する。
 *
 * @param length 作成する配列の長さ（0以上）。
 * @returns 0 から指定の範囲を返す。
 *
 * @example
 * ```ts
 * range(4); // [0, 1, 2, 3]
 * ```
 */
export function range(length: number): number[] {
  if (length < 0) return [];
  
  return [...Array(length).keys()];
}
