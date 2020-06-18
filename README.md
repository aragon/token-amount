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
