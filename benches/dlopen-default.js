const path = require("path");
const os = require("os");

const { measureAndLog } = require("../runner/utils");

measureAndLog(() => {
  const libraryPath = path.toNamespacedPath(process.env.ENGINE_SO);
  const libraryModule = { exports: {} };

  process.dlopen(libraryModule, libraryPath);
});
