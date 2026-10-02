import { defineConfig } from "tsup"

export default defineConfig([
  {
    entry: { index: "src/index.ts" },
    format: ["esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    tsconfig: "tsconfig.build.json",
    external: ["react", "react-dom", "react-router-dom"],
  },
  {
    entry: { "build/index": "build/index.ts" },
    format: ["esm"],
    dts: true,
    sourcemap: true,
    platform: "node",
    tsconfig: "tsconfig.build.node.json",
  },
])
