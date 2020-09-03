import JSBI from 'jsbi'
import { getConvertedAmount } from './convert'
import { formatTokenAmount } from './format'

export default class TokenAmount {
  #decimals
  #value
  #symbol

  constructor(value, decimals, { symbol = '' } = {}) {
    this.#decimals = JSBI.BigInt(String(decimals))
    this.#value = JSBI.BigInt(String(value))
    this.#symbol = symbol
  }

  get decimals() {
    return JSBI.toNumber(this.#decimals)
  }

  get symbol() {
    return this.#symbol
  }

  get value() {
    return this.#value.toString()
  }

  export() {
    const { decimals, symbol, value } = this
    const data = { d: decimals, v: value }
    if (symbol) {
      data.s = symbol
    }
    return JSON.stringify(data)
  }

  static import(json) {
    let data
    try {
      data = JSON.parse(json)
    } catch (err) {
      throw new Error('TokenAmount.import(): couldn’t parse data.')
    }
    if (!data.d || !data.v) {
      throw new Error('TokenAmount.import(): invalid data format provided.')
    }
    return new TokenAmount(data.v, data.d, { symbol: data.s })
  }

  static convert = getConvertedAmount

  convert(rate, targetDecimals, options) {
    const convertedAmount = getConvertedAmount(
      this.#value,
      this.#decimals,
      rate,
      targetDecimals
    )
    return new TokenAmount(convertedAmount, targetDecimals, options)
  }

  static format = formatTokenAmount

  format(options) {
    return formatTokenAmount(this.#value, this.#decimals, {
      symbol: this.#symbol,
      ...options,
    })
  }

  toString(options) {
    return this.format(options)
  }
}
