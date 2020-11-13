import BN from 'bn.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TokenAmount from 'token-amount'

function App() {
  const value = new BN('938829587970788394500000')
  const amount = new TokenAmount(value, 18).format()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        fontSize: 50,
      }}
    >
      {amount}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
