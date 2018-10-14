import typescript from 'rollup-plugin-typescript';

export default [
  // build ES modules for bundlers (webpack, rollup, ...)
  {
    input: 'src/feiertage.ts',
    output: {
      file: 'build/feiertage.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [typescript()],
  },

  // ... and umd for the rest (node, browser)
  {
    input: 'src/feiertage.ts',
    output: {
      file: 'build/feiertage.umd.js',
      name: 'feiertagejs',
      format: 'umd',
      noConflict: true,
      sourcemap: true,
    },
    plugins: [typescript()],
  },
];
