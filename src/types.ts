export type BigIntish = BigInt | { toString: () => string } | string | number

export type Rate = string | number

export type Options = {
  commify?: boolean
  digits?: BigIntish
  symbol?: string
  displaySign?: boolean
}

export type ExportData = {
  v: string
  d: number
  s?: string
}
