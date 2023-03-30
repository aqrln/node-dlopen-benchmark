.PHONY: all run-bench \
	debian-image bench-debian \
	fedora-image bench-fedora \
	amazonlinux-image bench-amazonlinux

all: node_modules bench-debian bench-fedora bench-amazonlinux

node_modules: package.json package-lock.json
	npm install

run-bench:
	docker run -v $(shell pwd):/workspace -it -w /workspace $(IMAGE) npm start

debian-image:
	docker build -t dlbench-debian -f Dockerfile.debian .

bench-debian: debian-image
	$(MAKE) run-bench IMAGE=dlbench-debian

fedora-image:
	docker build -t dlbench-fedora -f Dockerfile.fedora .

bench-fedora: fedora-image
	$(MAKE) run-bench IMAGE=dlbench-fedora

amazonlinux-image:
	docker build -t dlbench-amazonlinux -f Dockerfile.amazonlinux .

bench-amazonlinux: amazonlinux-image
	$(MAKE) run-bench IMAGE=dlbench-amazonlinux
