import JSBI from 'jsbi'

/**
 * Divide and round two big integers.
 *
 * @param {BigInt|string|number} dividend Integer to be divided + rounded
 * @param {BigInt|string|number} divisor  Divisor
 * @returns {string}
 */
export function divideRoundBigInt(dividend, divisor) {
  dividend = JSBI.BigInt(String(dividend))
  divisor = JSBI.BigInt(String(divisor))
  return JSBI.divide(
    JSBI.add(dividend, JSBI.divide(divisor, JSBI.BigInt(2))),
    divisor
  ).toString()
}
