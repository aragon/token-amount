/* global BigInt */
import TokenAmount from './TokenAmount'

describe('formatTokenAmount()', () => {
  test('should instanciate correctly', () => {
    const amount = new TokenAmount(BigInt('9388295879707883945'), 18, {
      symbol: 'ANT',
    })
    expect(amount.value).toEqual('9388295879707883945')
    expect(amount.decimals).toEqual(18)
    expect(amount.symbol).toEqual('ANT')
  })
  test('should convert correctly', () => {
    const oneEth = BigInt('1000000000000000000')
    const amount1 = new TokenAmount(oneEth, 18, {
      symbol: 'ANT',
    })

    // Convert a token amount with a number rate
    expect(amount1.convert(0.5, 4).value.toString()).toEqual('5000')

    const amount2 = new TokenAmount(oneEth, 18)

    expect(amount2.convert('400', '2').value.toString()).toEqual('40000')

    const amount3 = new TokenAmount('1', 0)

    expect(amount3.convert('0.5', 2).value.toString()).toEqual('50')
  })
  test('should format correctly', () => {
    const amount = new TokenAmount(BigInt('9388295879707883945'), 18)
    expect(amount.format()).toEqual('9.39')
    expect(amount.toString()).toEqual('9.39')
    expect(amount.format({ digits: 1 })).toEqual('9.4')
    expect(amount.format({ digits: 0 })).toEqual('9')
  })
  test('should export correctly', () => {
    const amount1 = new TokenAmount(BigInt('9388295879707883945'), 18)
    expect(amount1.export()).toEqual(
      JSON.stringify({ d: 18, v: '9388295879707883945' })
    )
    const amount2 = new TokenAmount(BigInt('9388295879707883945'), 18, {
      symbol: 'ANT',
    })
    expect(amount2.export()).toEqual(
      JSON.stringify({ d: 18, v: '9388295879707883945', s: 'ANT' })
    )
  })
  test('should import correctly', () => {
    const exported = new TokenAmount(BigInt('9388295879707883945'), 18, {
      symbol: 'ANT',
    }).export()
    const amount = TokenAmount.import(exported)

    expect(amount.value).toEqual('9388295879707883945')
    expect(amount.decimals).toEqual(18)
    expect(amount.symbol).toEqual('ANT')
  })
})
