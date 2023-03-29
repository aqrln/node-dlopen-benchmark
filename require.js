const { measureAndLog } = require("./utils");

measureAndLog(() => {
  require("./libquery_engine.so.node");
});
