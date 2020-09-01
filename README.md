# 💸 TokenAmount

[<img src="https://img.shields.io/npm/v/token-amount" alt="" />](https://www.npmjs.com/package/token-amount) [<img src="https://img.shields.io/bundlephobia/minzip/token-amount" alt="" />](https://bundlephobia.com/result?p=token-amount)

A transportable object for token amounts with formatting.

## Usage

Add it to your project:

```console
yarn add token-amount
```

Use it:

```js
import TokenAmount from 'token-amount'

const amount = new TokenAmount('9388295879707883945', 18, { symbol: 'ANT' })

console.log(amount.format()) // '9.39 ANT'
```

## API

### new TokenAmount(value, decimals, { symbol })

Instanciates a new `TokenAmount` with the given `value` and `decimals`. The options are optional, and can take a `symbol` (e.g. `"ANT"`).

#### Parameters

- `value`: the amount value, as a `BigInt`, `String`, `Number` or `BigInt`-like (e.g. BN.js).
- `decimals`: the amount of decimals, as a `BigInt`, `String`, `Number` or `BigInt`-like (e.g. BN.js).
- `symbol`: the token symbol, as a `String`.

### TokenAmount#format(options)

Formats the token amount.

#### Parameters

- `options.symbol`: the token symbol, as a `String`. Overrides the value set in the constructor.
- `options.commify`: whether the token amount should have comma separators
- `options.digits`: the number of digits to display. Defaults to `2`.
- `options.displaySign`: whether the sign (`-` or `+`) should be displayed for the amount.

### TokenAmount#format(options)

Alias to TokenAmount#format().

### TokenAmount#convert(rate, decimals, options)

Converts from a rate, returning a new `TokenAmount` instance with the desired decimals and set options.

#### Parameters

- `rate`: the rate to convert from, as a `BigInt`, `String`, `Number` or `TokenAmount`.
- `decimals`: the amount of decimals, as a `BigInt`, `String`, `Number` or `BigInt`-like (e.g. BN.js).
- `options.symbol`: the token symbol, as a `String`. Overrides the value set in the constructor.
- `options.commify`: whether the token amount should have comma separators
- `options.digits`: the number of digits to display. Defaults to `2`.
- `options.displaySign`: whether the sign (`-` or `+`) should be displayed for the amount.

### TokenAmount.convert(amount, rate, decimals, options)

Static equivalent of `TokenAmount#convert(rate, decimals, options)`.

### TokenAmount#export()

Exports the object into a string that can get stored or transported.

### TokenAmount.import()

Instanciates a new instance by importing a string generated by `TokenAmount#export()`.

### TokenAmount.format(amount, decimals, options)

Static equivalent of `TokenAmount#format()`.

#### Parameters

- `value`: the amount value, as a `BigInt`, `String`, `Number` or `BigInt`-like (e.g. BN.js).
- `decimals`: the amount of decimals, as a `BigInt`, `String`, `Number` or `BigInt`-like (e.g. BN.js).
- `options.symbol`: the token symbol, as a `String`.
- `options.commify`: wether the token amount should have comma separators
- `options.digits`: the number of digits to display. Defaults to `2`.
- `options.displaySign`: whether the sign (`-` or `+`) should be displayed for the amount.
