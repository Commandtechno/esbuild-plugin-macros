/** @type {import('esbuild').Plugin} */
module.exports = {
  name: "esbuild-plugin-macros",
  setup(build) {
    build.onLoad({ filter: /\.macro\.[^\.]+$/ }, async args => {
      const code = await esbuild
        .build({
          entryPoints: [args.path],
          bundle: true,
          write: false,
          watch: true,
          outfile: "",
          format: "esm"
        })
        .then(result => result.outputFiles[0]);

      const exports = await import("data:text/javascript;charset=utf-8;base64," + btoa(code));
      return { loader: "ts", contents: "export = " + serialize(exports) };
    });
  }
};