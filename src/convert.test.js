import JSBI from 'jsbi'
import { getConvertedAmount } from './convert'

const ONE_ETH = JSBI.BigInt('1000000000000000000')

describe('getConvertedAmount tests', () => {
  test('Converts amounts correctly', () => {
    expect(getConvertedAmount(JSBI.BigInt('1'), 1, 1, 1).toString()).toEqual(
      '1'
    )
    expect(getConvertedAmount(ONE_ETH, 18, 0.5, 4).toString()).toEqual('5000')
    expect(getConvertedAmount(JSBI.BigInt('1'), 0, 0.5, 2).toString()).toEqual(
      '50'
    )
    expect(getConvertedAmount(JSBI.BigInt('1'), 0, 0.25, 2).toString()).toEqual(
      '25'
    )
    expect(
      getConvertedAmount(JSBI.BigInt('1'), 0, 0.125, 3).toString()
    ).toEqual('125')

    expect(getConvertedAmount(JSBI.BigInt('100'), 0, 50, 0).toString()).toEqual(
      '5000'
    )
    expect(getConvertedAmount(ONE_ETH, 18, 400, 2).toString()).toEqual('40000')
  })

  test('Converts amounts correctly with rates being strings', () => {
    expect(getConvertedAmount(JSBI.BigInt('1'), 1, '1', 1).toString()).toEqual(
      '1'
    )
    expect(getConvertedAmount(ONE_ETH, 18, '0.5', 4).toString()).toEqual('5000')
    expect(
      getConvertedAmount(JSBI.BigInt('1'), 0, '0.5', 2).toString()
    ).toEqual('50')
    expect(
      getConvertedAmount(JSBI.BigInt('1'), 0, '0.25', 2).toString()
    ).toEqual('25')
    expect(
      getConvertedAmount(JSBI.BigInt('1'), 0, '0.125', 3).toString()
    ).toEqual('125')

    expect(
      getConvertedAmount(JSBI.BigInt('100'), 0, '50', 0).toString()
    ).toEqual('5000')
    expect(getConvertedAmount(ONE_ETH, 18, '400', 2).toString()).toEqual(
      '40000'
    )
  })
})
