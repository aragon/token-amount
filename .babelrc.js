module.exports = {
  // Override TSDX preset-env with own browser targets
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '> 2%, not dead, not ie > 0',
      },
    ],
  ],
}
