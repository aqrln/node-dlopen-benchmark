const { measureAndLog } = require("../runner/utils");

measureAndLog(() => {
  require(process.env.ENGINE_SO);
});
