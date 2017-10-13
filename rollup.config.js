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
    noConflict: true,
    sourcemap: true,
  },

  // ... and umd for the rest (node, browser)
  {
    input: 'src/feiertage.js',
    output: {
      file: 'build/feiertage.umd.js',
      format: 'umd',
    },
    name: 'feiertagejs',
    plugins: [babel()],
    noConflict: true,
    sourcemap: true,
  },
];
