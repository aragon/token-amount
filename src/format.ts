import JSBI from 'jsbi'
import { NO_BREAK_SPACE } from './characters'
import { divideRoundBigInt } from './math'
import { BigIntish, Options } from './types'

/**
 * Formats a number for display purposes.
 *
 * This function is not using Intl.NumberFormat() to be compatible with big
 * integers expressed as string, or BigInt-like objects.
 *
 * @param {BigInt|string|number} number Number to convert
 * @returns {string}
 */
export function formatNumber(number: BigIntish): string {
  const numAsString = String(number)
  const [integer, decimals] = numAsString.split('.')

  return integer
    .split('')
    .reverse()
    .reduce(
      (result, digit, index) => {
        return `${digit}${index > 0 && index % 3 === 0 ? ',' : ''}${result}`
      },
      decimals ? `.${decimals}` : ''
    )
}

/**
 * Formats a token amount for display purposes.
 *
 * @param {BigInt|string|number} amount              Number to round
 * @param {BigInt|string|number} decimals            Decimal placement for amount
 * @param {BigInt|string|number} digits              Rounds the number to a given decimal place
 * @param {boolean}              options.commify     Decides if the formatted amount should include commas
 * @param {boolean}              options.displaySign Decides if the sign should be displayed
 * @param {string}               options.symbol      Symbol for the token amount
 * @returns {string}
 */
export function formatTokenAmount(
  amount: BigIntish,
  decimals: BigIntish,
  options: Options = {}
): string {
  const {
    commify = true,
    digits = 2,
    symbol = '',
    displaySign = false,
  } = options

  let parsedAmount = JSBI.BigInt(String(amount))
  const parsedDecimals = JSBI.BigInt(String(decimals))
  let parsedDigits = JSBI.BigInt(String(digits))

  const _0 = JSBI.BigInt(0)
  const _10 = JSBI.BigInt(10)

  if (JSBI.lessThan(parsedDecimals, _0)) {
    throw new Error('formatTokenAmount(): decimals cannot be negative')
  }

  if (JSBI.lessThan(parsedDigits, _0)) {
    throw new Error('formatTokenAmount(): digits cannot be negative')
  }

  if (JSBI.lessThan(parsedDecimals, parsedDigits)) {
    parsedDigits = parsedDecimals
  }

  const negative = JSBI.lessThan(parsedAmount, _0)

  if (negative) {
    parsedAmount = JSBI.unaryMinus(parsedAmount)
  }

  const amountConverted = JSBI.equal(parsedDecimals, _0)
    ? parsedAmount
    : JSBI.BigInt(
        divideRoundBigInt(
          parsedAmount,
          JSBI.exponentiate(_10, JSBI.subtract(parsedDecimals, parsedDigits))
        )
      )

  const leftPart = JSBI.divide(
    amountConverted,
    JSBI.exponentiate(_10, parsedDigits)
  )
  const processedLeftPart = commify ? formatNumber(leftPart) : leftPart

  const rightPart = String(
    JSBI.remainder(amountConverted, JSBI.exponentiate(_10, parsedDigits))
  )
    .padStart(Number(parsedDigits), '0')
    .replace(/0+$/, '')

  return [
    displaySign ? (negative ? '-' : '+') : '',
    processedLeftPart,
    rightPart ? `.${rightPart}` : '',
    symbol ? `${NO_BREAK_SPACE}${symbol}` : '',
  ].join('')
}
