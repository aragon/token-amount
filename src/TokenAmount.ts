import { convertAmount } from './convert'
import { formatTokenAmount } from './format'
import { BigIntish, ExportData, Options, Rate } from './types'

export default class TokenAmount {
  #decimals: bigint
  #value: bigint
  #symbol: string

  constructor(value: BigIntish, decimals: BigIntish, { symbol = '' } = {}) {
    this.#decimals = BigInt(String(decimals))
    this.#value = BigInt(String(value))
    this.#symbol = symbol
  }

  get decimals(): number {
    return Number(this.#decimals)
  }

  get symbol(): string {
    return this.#symbol
  }

  get value(): string {
    return this.#value.toString()
  }

  export(): string {
    const { decimals, symbol, value } = this
    const data: ExportData = { d: decimals, v: value }
    if (symbol) {
      data.s = symbol
    }
    return JSON.stringify(data)
  }

  static import(json: string): TokenAmount {
    let data: ExportData

    try {
      data = JSON.parse(json) as ExportData
    } catch (err) {
      throw new Error('TokenAmount.import(): couldn’t parse data.')
    }
    if (!data.d || !data.v) {
      throw new Error('TokenAmount.import(): invalid data format provided.')
    }
    return new TokenAmount(data.v, data.d, { symbol: data.s })
  }

  static convert(
    amount: { value: BigIntish; decimals: BigIntish },
    convertRate: Rate,
    targetDecimals: BigIntish,
    options?: Options
  ): TokenAmount {
    const convertedAmount = convertAmount(
      amount.value,
      amount.decimals,
      convertRate,
      targetDecimals
    )
    return new TokenAmount(convertedAmount, targetDecimals, options)
  }

  convert(
    rate: Rate,
    targetDecimals: BigIntish,
    options?: Options
  ): TokenAmount {
    return TokenAmount.convert(this, rate, targetDecimals, options)
  }

  static format = formatTokenAmount

  format(options?: Options): string {
    return formatTokenAmount(this.#value, this.#decimals, {
      symbol: this.#symbol,
      ...options,
    })
  }

  toString(options?: Options): string {
    return this.format(options)
  }
}
