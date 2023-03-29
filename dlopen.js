const path = require("path");
const os = require("os");

const { measureAndLog } = require("./utils");

measureAndLog(() => {
  const libraryPath = path.toNamespacedPath("./libquery_engine.so.node");
  const libraryModule = { exports: {} };

  let flags = 0;

  if (process.platform !== "win32") {
    flags |= os.constants.dlopen.RTLD_LAZY;
  }

  if (process.platform === "linux") {
    flags |= os.constants.dlopen.RTLD_DEEPBIND;
  }

  console.log(flags);

  process.dlopen(libraryModule, libraryPath, flags);
});
