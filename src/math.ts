import JSBI from 'jsbi'
import { BigIntish } from './types'

/**
 * Divide and round two big integers.
 *
 * @param {BigInt|string|number} dividend Integer to be divided + rounded
 * @param {BigInt|string|number} divisor  Divisor
 * @returns {string}
 */
export function divideRoundBigInt(
  dividend: BigIntish,
  divisor: BigIntish
): string {
  const parsedDividend = JSBI.BigInt(String(dividend))
  const parsedDivisor = JSBI.BigInt(String(divisor))

  return JSBI.divide(
    JSBI.add(parsedDividend, JSBI.divide(parsedDivisor, JSBI.BigInt(2))),
    parsedDivisor
  ).toString()
}
