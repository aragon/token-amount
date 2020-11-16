import JSBI from 'jsbi'
import { divideRoundBigInt } from './math'
import { BigIntish } from './types'

// Cache 10 since we are using it a lot.
const _10 = JSBI.BigInt(10)

/**
 * Converts an amount. The conversion rate is expressed as the amount of the output token
 * obtained per unit of the input token.
 *
 * e.g:
 * Input token: ANT
 * Output token: ETH
 * Amount of ANT: 10
 * Conversion rate: 0.5 ETH per ANT. (1 ANT = 0.5 ETH)
 * Converted Amount = 10 * 0.50 = 5 ETH.
 *
 * @param {BigInt|string|number} amount              Amount of the input token to convert.
 * @param {BigInt|string|number} decimals            Decimals of the input token to convert.
 * @param {string|number} convertRate                Rate of conversion between the input and output token.
 * @param {BigInt|string|number} targetDecimals      Decimals for the output amount.
 * @returns {string}
 */
export function convertAmount(
  amount: BigIntish,
  decimals: BigIntish,
  convertRate: string | number,
  targetDecimals: BigIntish
): string {
  const parsedAmount = JSBI.BigInt(String(amount))
  const parsedDecimals = JSBI.BigInt(String(decimals))
  const parsedTargetDecimals = JSBI.BigInt(String(targetDecimals))

  const [rateWhole = '', rateDec = ''] = String(convertRate).split('.')

  // Remove any trailing zeros from the decimal part
  const parsedRateDec = rateDec.replace(/0*$/, '')

  // Construct the final rate, and remove any leading zeros
  const rate = JSBI.BigInt(`${rateWhole}${parsedRateDec}`.replace(/^0*/, ''))

  const ratePrecision = JSBI.BigInt(parsedRateDec.length)
  const scaledRate = JSBI.multiply(
    rate,
    JSBI.exponentiate(_10, parsedTargetDecimals)
  )

  const convertedAmount = divideRoundBigInt(
    divideRoundBigInt(
      JSBI.multiply(parsedAmount, scaledRate),
      JSBI.exponentiate(_10, ratePrecision)
    ),
    JSBI.exponentiate(_10, parsedDecimals)
  )

  return String(convertedAmount)
}
