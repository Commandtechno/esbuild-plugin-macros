Usage: rename any javascript file to end with .macros.js instead of .js or any other extension that esbuild supports like .jsx, .ts, .tsx

Supports top level await, esm, and cjs (anything esbuild will support)

Supports anything https://npmjs.com/serialize-javascript will serialize so uhh nothing too crazy

Check out the example here which fetches a JSON and formats it at compile time: https://github.com/Commandtechno/esbuild-plugin-macros/blob/master/example

Have fun!