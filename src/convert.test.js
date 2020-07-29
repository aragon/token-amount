import JSBI from 'jsbi'
import { getConvertedAmount } from './convert'
import TokenAmount from './TokenAmount'

const ONE_ETH = JSBI.BigInt('1000000000000000000')

describe('getConvertedAmount tests', () => {
  test('Converts amounts correctly', () => {
    expect(getConvertedAmount(JSBI.BigInt('1'), 1).toString()).toEqual('1')
    expect(getConvertedAmount(ONE_ETH, 1).toString()).toEqual(
      ONE_ETH.toString()
    )
    expect(getConvertedAmount(JSBI.BigInt('1'), 0.5).toString()).toEqual('2')
    expect(getConvertedAmount(JSBI.BigInt('1'), 0.25).toString()).toEqual('4')
    expect(getConvertedAmount(JSBI.BigInt('1'), 0.125).toString()).toEqual('8')

    expect(getConvertedAmount(JSBI.BigInt('100'), 50).toString()).toEqual('2')
    // This is the exact case that broke the previous implementation,
    // which is AAVE's amount of WBTC + the exchange rate at a certain
    // hour on 2020-06-24
    expect(
      getConvertedAmount(JSBI.BigInt('1145054'), 0.00009248).toString()
    ).toEqual('12381639273')
  })

  test('Converts amounts correctly with rates being strings', () => {
    expect(getConvertedAmount(JSBI.BigInt('1'), '1').toString()).toEqual('1')
    expect(getConvertedAmount(ONE_ETH, '1').toString()).toEqual(
      ONE_ETH.toString()
    )
    expect(getConvertedAmount(JSBI.BigInt('1'), '0.5').toString()).toEqual('2')
    expect(getConvertedAmount(JSBI.BigInt('1'), '0.25').toString()).toEqual('4')
    expect(getConvertedAmount(JSBI.BigInt('1'), '0.125').toString()).toEqual(
      '8'
    )

    expect(getConvertedAmount(JSBI.BigInt('100'), '50').toString()).toEqual('2')
    // This is the exact case that broke the previous implementation,
    // which is AAVE's amount of WBTC + the exchange rate at a certain
    // hour on 2020-06-24
    expect(
      getConvertedAmount(JSBI.BigInt('1145054'), '0.00009248').toString()
    ).toEqual('12381639273')
  })

  test('Converts amounts correctly with rates being instances of TokenAmount', () => {
    const tenThousand = JSBI.multiply(ONE_ETH, JSBI.BigInt('10000'))
    const tokenTenThousand = new TokenAmount(tenThousand, 18)
    expect(
      getConvertedAmount(tenThousand, tokenTenThousand).toString()
    ).toEqual('1')

    // 1 / 0.1 = 10
    const zeroPointOne = JSBI.divide(ONE_ETH, JSBI.BigInt('10'))
    const tokenZeroPointOne = new TokenAmount(zeroPointOne, 18)
    expect(getConvertedAmount(ONE_ETH, tokenZeroPointOne).toString()).toEqual(
      '10'
    )

    // 1 / 0.25 = 4
    const zeroPointTwentyFive = JSBI.divide(ONE_ETH, JSBI.BigInt('4'))
    const tokenPointTwentyFive = new TokenAmount(zeroPointTwentyFive, 18)
    expect(
      getConvertedAmount(ONE_ETH, tokenPointTwentyFive).toString()
    ).toEqual('4')

    // 1 / 0.125 = 8
    const zeroPointOneTwentyFive = JSBI.divide(ONE_ETH, JSBI.BigInt('8'))
    const tokenPointOneTwentyFive = new TokenAmount(zeroPointOneTwentyFive, 18)
    expect(
      getConvertedAmount(ONE_ETH, tokenPointOneTwentyFive).toString()
    ).toEqual('8')
  })

  test('Throws on invalid inputs', () => {
    expect(() => getConvertedAmount(JSBI.BigInt('1'), 0)).toThrow()
    expect(() => getConvertedAmount('1000', 0)).toThrow()
  })
})
