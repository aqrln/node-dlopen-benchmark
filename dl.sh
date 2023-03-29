#!/usr/bin/env bash

set -euo pipefail

if [[ $# != 1 ]]; then
  >&2 echo "usage: $0 <platform>"
  exit 1
fi

platform=$1

if [[ $platform == darwin* ]]; then
  lib_ext=dylib
else
  lib_ext=so
fi

binaries=(
  libquery_engine.$lib_ext.node
)

engines_version=64c8eb0907239978ca967395f447b0f87b9d2e1d

for bin in ${binaries[@]}; do
  echo "downloading $bin..."
  curl -O "https://binaries.prisma.sh/all_commits/$engines_version/$platform/$bin.gz"
  gunzip -f $bin.gz
  chmod +x $bin
done
