import JSBI from 'jsbi'

function getRawRate(convertRate) {
  if (typeof convertRate === 'number' || typeof convertRate === 'string') {
    return convertRate.toString().split('.')
  }
  return [convertRate.value, '']
}

/**
 * Converts an amount. the conversion rate is expressed as how much of the
 * current token is needed to get 1 unit of the ouput token,
 * e.g:
 * Input token: ANT
 * Output token: ETH
 * Amount of ANT: 10
 * Conversion rate (1 ETH = ? ANT): 1 ETH = 0.10 ANT
 * Converted Amount = 10 / 0.10 = 100 ETH.
 *
 * @param {BigInt} amount                            Amount of the input token to convert.
 * @param {BigInt|string|number} decimals            Decimal placement for amount
 * @returns {string}
 */
export function getConvertedAmount(amount, convertRate) {
  const [whole = '', dec = ''] = getRawRate(convertRate)
  // Remove any trailing zeros from the decimal part
  const parsedDec = dec.replace(/0*$/, '')
  // Construct the final rate, and remove any leading zeros
  const rate = `${whole}${parsedDec}`.replace(/^0*/, '')

  // Number of decimals to shift the amount of the token passed in,
  // resulting from converting the rate to a number without any decimal
  // places
  const carryAmount = JSBI.BigInt(parsedDec.length.toString())
  const carry = JSBI.exponentiate(JSBI.BigInt('10'), carryAmount)

  const shiftedAmount = JSBI.multiply(amount, carry)
  const convertedAmount = JSBI.divide(shiftedAmount, JSBI.BigInt(rate))

  return convertedAmount
}
