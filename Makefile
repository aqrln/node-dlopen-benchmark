.PHONY: debian-image bench-debian fedora-image bench-fedora

debian-image:
	docker build -t dlbench-debian -f Dockerfile.debian .

fedora-image:
	docker build -t dlbench-fedora -f Dockerfile.fedora .

bench-debian: debian-image
	docker run -v $(shell pwd):/workspace -it -w /workspace dlbench-debian npm start

bench-fedora: fedora-image
	docker run -v $(shell pwd):/workspace -it -w /workspace dlbench-fedora npm start
