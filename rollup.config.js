import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

// Fix for Rollup 2.x
const packageJson = JSON.parse(JSON.stringify(pkg));

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const babelOptions = {
  babelHelpers: 'bundled',
  extensions,
  exclude: 'node_modules/**',
};

export default [
  // ESM and CJS builds
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel(babelOptions),
    ],
  },
  
  // UMD build
  {
    input: 'src/index.ts',
    output: {
      file: packageJson.browser,
      format: 'umd',
      name: 'NotificAI',
      sourcemap: true,
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel(babelOptions),
      terser(),
    ],
  },
  
  // Types
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/notific-ai-sdk.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];