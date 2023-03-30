import childProcess from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import cliProgress from "cli-progress";

const NUM_RUNS = Number(process.env.NUM_RUNS || "1000");

if (!process.env.PLATFORM) {
  throw new Error("$PLATFORM missing");
}

if (!process.env.ENGINE_SO) {
  throw new Error("$ENGINE_SO missing");
}

const benchDir = path.join(__dirname, "..", "benches");
const resultsDir = path.join(__dirname, "..", "results", process.env.PLATFORM);

fs.mkdirSync(resultsDir, { recursive: true });

const benchNames = fs
  .readdirSync(benchDir)
  .map((filename) => path.basename(filename, ".js"));

const benchResults = Object.fromEntries(
  benchNames.map((name) => [name, [] as number[]])
);

const progressBar = new cliProgress.SingleBar({});
progressBar.start(NUM_RUNS, 0);

for (let i = 0; i < NUM_RUNS; i++) {
  for (const bench of benchNames) {
    const { stdout } = spawnBench(bench);
    benchResults[bench].push(parseFloat(stdout));
  }

  progressBar.increment();
}

progressBar.stop();

fs.writeFileSync(
  path.join(resultsDir, "results.json"),
  JSON.stringify(benchResults, null, 2)
);

function spawnBench(name: string) {
  const child = childProcess.spawnSync(
    "node",
    [path.join(benchDir, `${name}.js`)],
    { encoding: "utf-8" }
  );

  if (child.status !== 0 || child.signal !== null) {
    throw new Error(
      `"${name}.js" exited with status ${child.status} on signal ${child.signal}, stderr: ${child.stderr}`
    );
  }

  return child;
}
