const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

const config = [
  // ES Modules build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.mjs',
      format: 'es',
      sourcemap: true,
      inlineDynamicImports: true
    },
    plugins: [
      resolve({ browser: false }),
      commonjs(),
      typescript({
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src'
      })
    ],
    external: ['node-fetch']
  },
  
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      inlineDynamicImports: true
    },
    plugins: [
      resolve({ browser: false }),
      commonjs(),
      typescript({
        declaration: false
      })
    ],
    external: ['node-fetch']
  }
];

module.exports = config; 