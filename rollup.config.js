import babel from 'rollup-plugin-babel';

export default [
  // build ES modules for bundlers (webpack, rollup, ...)
  {
    input: 'src/feiertage.js',
    output: {
      file: 'build/feiertage.js',
      format: 'es',
    },
    plugins: [babel()],
    sourcemap: true,
  },

  // ... and umd for the rest (node, browser)
  {
    input: 'src/feiertage.js',
    output: {
      file: 'build/feiertage.umd.js',
      name: 'feiertagejs',
      format: 'umd',
      noConflict: true,
      sourcemap: true,
    },
    plugins: [babel()],
  },
];
