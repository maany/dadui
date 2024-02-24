import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import shebang from 'rollup-plugin-shebang-bin'
import pkg from "./package.json";
const fs = require('fs');
const path = require('path');

export default [
  // browser-friendly UMD build
  {
    input: "src/cli.ts",
    output: {
      dir: "dist",
      format: "es",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      typescript({ tsconfig: "./tsconfig.json" }),
      {
        name: 'copy-kitui-js',
        generateBundle() {
          fs.copyFileSync(path.resolve(__dirname, 'src/kitui.js'), path.resolve(__dirname, 'dist/kitui.js'));
        }
      }
    ],
  },
];
