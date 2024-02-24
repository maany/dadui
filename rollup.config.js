import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" with { type: "json" };
import dts from 'rollup-plugin-dts'

import fs from "fs";
import path from "path";

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "es",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      dts(),
      typescript({ tsconfig: "./tsconfig.json" }),
      {
        name: 'copy-executable-wrapper',
        generateBundle() {
          // get the directory of this file
          if (!fs.existsSync("dist")) {
            fs.mkdirSync("dist");
          }
          fs.copyFileSync(path.resolve(`src/${pkg.bin.executable_name}`), path.resolve(`dist/${pkg.bin.executable_name}`));
        }
      }
    ],
  },
];
