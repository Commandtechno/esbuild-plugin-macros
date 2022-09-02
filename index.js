const serialize = require("serialize-javascript");

/** @type {import('esbuild').Plugin} */
module.exports = {
  name: "esbuild-plugin-macros",
  setup(ctx) {
    ctx.onLoad({ filter: /\.macro\.[^\.]+$/ }, async args => {
      const code = await ctx.esbuild
        .build({
          entryPoints: [args.path],
          bundle: true,
          write: false,
          outfile: "",
          format: "esm"
        })
        .then(result => result.outputFiles[0].contents);

      const exports = await import("data:text/javascript;base64," + Buffer.from(code).toString("base64"));
      return { loader: "ts", contents: "export = " + serialize(exports) };
    });
  }
};