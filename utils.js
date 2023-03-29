function timeElapsedInMs(startNs, endNs) {
  const t = endNs - startNs;
  const m = 1_000_000,
    bm = BigInt(m);
  const d = t / bm;
  const r = t % bm;
  return Number(d) + Number(r) / m;
}

function measure(cb) {
  const timeStart = process.hrtime.bigint();
  cb();
  const timeEnd = process.hrtime.bigint();
  return timeElapsedInMs(timeStart, timeEnd);
}

function measureAndLog(cb) {
  console.log(measure(cb));
}

module.exports = { timeElapsedInMs, measure, measureAndLog };
