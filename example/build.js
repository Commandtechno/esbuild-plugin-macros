const esbuild = require("esbuild");
const serialize = require("serialize-javascript");

esbuild.build({
  entryPoints: ["test.js"],
  bundle: true,
  plugins: [
    {
      name: "esbuild-plugin-macros",
      async setup(build) {
        await build.onLoad({ filter: /\.macro\.[^\.]+$/ }, async args => {
          const code = await esbuild
            .build({
              entryPoints: [args.path],
              bundle: true,
              write: false,
              watch: true,
              outfile: "",
              format: "esm"
            })
            .then(result => result.outputFiles[0].text);

          const exports = await import("data:text/javascript;charset=utf-8;base64," + btoa(code));
          return { loader: "ts", contents: "export = " + serialize(exports) };
        });
      }
    }
  ]
});