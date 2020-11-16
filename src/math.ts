/**
 * Divide and round two big integers.
 *
 * @param {bigint} dividend Integer to be divided + rounded
 * @param {bigint} divisor  Divisor
 * @returns {bigint}
 */
export function divideRoundBigInt(dividend: bigint, divisor: bigint): bigint {
  return (dividend + divisor / BigInt(2)) / divisor
}
