.PHONY: all run-bench debian-image bench-debian fedora-image bench-fedora

all: bench-debian bench-fedora

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
