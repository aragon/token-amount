import { convertAmount } from './convert'

const ONE_ETH = 1000000000000000000n

describe('convertAmount tests', () => {
  test('Converts amounts correctly', () => {
    expect(convertAmount(1, 1, 1, 1)).toEqual('1')
    expect(convertAmount(ONE_ETH, 18, 0.5, 4)).toEqual('5000')
    expect(convertAmount(1, 0, 0.5, 2)).toEqual('50')
    expect(convertAmount(1, 0, 0.25, 2)).toEqual('25')
    expect(convertAmount(1, 0, 0.125, 3)).toEqual('125')
    expect(convertAmount(100, 0, 50, 0)).toEqual('5000')
    expect(convertAmount(ONE_ETH, 18, 400, 2)).toEqual('40000')
  })

  test('Converts amounts correctly with rates being strings', () => {
    expect(convertAmount(1, 1, '1', 1)).toEqual('1')
    expect(convertAmount(ONE_ETH, 18, '0.5', 4)).toEqual('5000')
    expect(convertAmount(1, 0, '0.5', 2)).toEqual('50')
    expect(convertAmount(1, 0, '0.25', 2)).toEqual('25')
    expect(convertAmount(1, 0, '0.125', 3)).toEqual('125')
    expect(convertAmount(100, 0, '50', 0)).toEqual('5000')
    expect(convertAmount(ONE_ETH, 18, '400', 2)).toEqual('40000')
    expect(convertAmount(4000n * ONE_ETH, 18, '400', 2)).toEqual('160000000')
  })

  test('rounds truncated decimals properly', () => {
    expect(convertAmount(ONE_ETH, 18, '23998327.34987439', 2)).toEqual(
      '2399832735'
    )
    expect(convertAmount(1, 2, '23998327.34987439', 9)).toEqual(
      '239983273498744'
    )
  })
})
