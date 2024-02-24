import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

const fs = require('fs');
const path = require('path');

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      plugins: [
        {
          name: "create-dist-directory",
          generateBundle() {
            if (!fs.existsSync("dist")) {
              fs.mkdirSync("dist");
            }
          },
        },
      ],
      format: "es",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      typescript({ tsconfig: "./tsconfig.json" }),
      {
        name: 'copy-executable-wrapper',
        generateBundle() {
          fs.copyFileSync(path.resolve(__dirname, `src/${pkg.bin.executable_name}`), path.resolve(__dirname, `dist/${pkg.bin.executable_name}`));
        }
      }
    ],
  },
];
