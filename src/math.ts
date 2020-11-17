import { BigIntish } from './types'

/**
 * Divide and round two big integers.
 *
 * @param {BigInt|string|number} dividend Integer to be divided + rounded
 * @param {BigInt|string|number} divisor  Divisor
 * @returns {BigInt}
 */
export function divideRoundBigInt(
  dividend: BigIntish,
  divisor: BigIntish
): bigint {
  const parsedDividend = BigInt(String(dividend))
  const parsedDivisor = BigInt(String(divisor))

  return (parsedDividend + parsedDivisor / BigInt(2)) / parsedDivisor
}
