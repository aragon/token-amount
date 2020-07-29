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
    const zeroPointOneEth = BigInt('10000000000000000000')
    const amount1 = new TokenAmount(oneEth, 18, {
      symbol: 'ANT',
    })

    // Convert a token amount with a number rate
    expect(amount1.convert(0.1, 18, { symbol: 'ANT' }).value).toEqual(
      zeroPointOneEth.toString()
    )

    const two = BigInt('2000000000000000000')
    const amount2 = new TokenAmount(oneEth, 18, {
      symbol: 'ANT',
    })

    // Convert a token amount with a string rate
    expect(amount2.convert('0.50', 18, { symbol: 'ANT' }).value).toEqual(
      two.toString()
    )

    const zeroPointTwentyFive = BigInt('250000000000000000')
    const tokenZeroPointTwentyFive = new TokenAmount(zeroPointTwentyFive, 18)
    const amount3 = new TokenAmount(oneEth, 18, {
      symbol: 'ANT',
    })

    // Convert a token amount with a token amount rate
    expect(
      amount3.convert(tokenZeroPointTwentyFive, 18, { symbol: 'ANT' }).value
    ).toEqual('4')
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
