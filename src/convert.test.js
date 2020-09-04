import { getConvertedAmount } from './convert'

const ONE_ETH = 1000000000000000000n

describe('getConvertedAmount tests', () => {
  test('Converts amounts correctly', () => {
    expect(getConvertedAmount(1, 1, 1, 1).toString()).toEqual('1')
    expect(getConvertedAmount(ONE_ETH, 18, 0.5, 4).toString()).toEqual('5000')
    expect(getConvertedAmount(1, 0, 0.5, 2).toString()).toEqual('50')
    expect(getConvertedAmount(1, 0, 0.25, 2).toString()).toEqual('25')
    expect(getConvertedAmount(1, 0, 0.125, 3).toString()).toEqual('125')
    expect(getConvertedAmount(100, 0, 50, 0).toString()).toEqual('5000')
    expect(getConvertedAmount(ONE_ETH, 18, 400, 2).toString()).toEqual('40000')
  })

  test('Converts amounts correctly with rates being strings', () => {
    expect(getConvertedAmount(1, 1, '1', 1).toString()).toEqual('1')
    expect(getConvertedAmount(ONE_ETH, 18, '0.5', 4).toString()).toEqual('5000')
    expect(getConvertedAmount(1, 0, '0.5', 2).toString()).toEqual('50')
    expect(getConvertedAmount(1, 0, '0.25', 2).toString()).toEqual('25')
    expect(getConvertedAmount(1, 0, '0.125', 3).toString()).toEqual('125')
    expect(getConvertedAmount(100, 0, '50', 0).toString()).toEqual('5000')
    expect(getConvertedAmount(ONE_ETH, 18, '400', 2).toString()).toEqual(
      '40000'
    )
    expect(
      getConvertedAmount(4000n * ONE_ETH, 18, '400', 2).toString()
    ).toEqual('160000000')
  })

  test('rounds truncated decimals properly', () => {
    expect(
      getConvertedAmount(ONE_ETH, 18, '23998327.34987439', 2).toString()
    ).toEqual('2399832735')
    expect(getConvertedAmount(1, 2, '23998327.34987439', 9).toString()).toEqual(
      '239983273498744'
    )
  })
})
