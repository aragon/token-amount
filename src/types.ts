import JSBI from 'jsbi'

export type BigIntish = BigInt | JSBI | string | number

export type Rate = string | number

export type Options = {
  commify?: boolean
  digits?: BigIntish
  symbol?: string
  displaySign?: boolean
}

export type ExportData = {
  v: BigIntish
  d: BigIntish
  s?: string
}
