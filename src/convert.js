import JSBI from 'jsbi'

// Many times during calculations we need to "scale up" the
// numbers so we can perform certain calculations such as division more easily;
// We'd usually calculate this manually, but can be a chore; so we'll take an extra
// step and scale it up by an arbitrary amount first before doing all other calculations.
const PRECISION_MIN = JSBI.BigInt(6)

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
 * @returns {BigInt}
 */
export function getConvertedAmount(
  amount,
  decimals,
  convertRate,
  targetDecimals
) {
  amount = JSBI.BigInt(String(amount))
  decimals = JSBI.BigInt(String(decimals))
  targetDecimals = JSBI.BigInt(String(targetDecimals))

  const [whole = '', dec = ''] = String(convertRate).split('.')

  // Remove any trailing zeros from the decimal part
  const parsedDec = dec.replace(/0*$/, '')

  // Construct the final rate, and remove any leading zeros
  const rate = `${whole}${parsedDec}`.replace(/^0*/, '')

  // We need to remember this to properly scale the resulting converted number
  // down, as the decimals added through the safe shifting of the conversion rate
  // will get added to the final number.
  const carryAmount = JSBI.BigInt(parsedDec.length.toString())

  const scaledRate = JSBI.multiply(
    JSBI.BigInt(rate),
    JSBI.exponentiate(
      JSBI.BigInt('10'),
      JSBI.add(PRECISION_MIN, JSBI.BigInt(String(targetDecimals)))
    )
  )

  const convertedAmount = JSBI.divide(
    JSBI.divide(
      JSBI.multiply(amount, scaledRate),
      JSBI.exponentiate(JSBI.BigInt('10'), JSBI.add(PRECISION_MIN, carryAmount))
    ),
    JSBI.exponentiate(JSBI.BigInt('10'), JSBI.BigInt(String(decimals)))
  )

  return convertedAmount
}
