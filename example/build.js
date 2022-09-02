const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["index.js"],
  bundle: true,
  plugins: [require("..")]
});