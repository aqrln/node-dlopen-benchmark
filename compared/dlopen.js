const path = require("path");
const os = require("os");

const { measureAndLog } = require("../runner/utils");

measureAndLog(() => {
  const libraryPath = path.toNamespacedPath(process.env.ENGINE_SO);
  const libraryModule = { exports: {} };

  let flags = 0;

  if (process.platform !== "win32") {
    flags |= os.constants.dlopen.RTLD_LAZY;
  }

  if (process.platform === "linux") {
    flags |= os.constants.dlopen.RTLD_DEEPBIND;
  }

  process.dlopen(libraryModule, libraryPath, flags);
});
