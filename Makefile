TARGET_DIR := /app/src
IMAGE_NAME := confpad

# Main development target
.PHONY: develop
develop: generate-conferences-json
	docker run -ti --rm \
	  --workdir $(TARGET_DIR) \
	  --mount type=bind,source=$(CURDIR),target=$(TARGET_DIR) \
	  --publish 127.0.0.1:8080:80 \
	  php:7.3-cli-alpine \
	  php -S 0.0.0.0:80

# Run tests
.PHONY: test
test: build-image
	docker run -t --rm \
	  --workdir $(TARGET_DIR) \
	  --mount type=bind,source=$(CURDIR),target=$(TARGET_DIR) \
	  $(IMAGE_NAME) \
	  jest --silent --bail --expand ./test

# Run tests for single conference
# Example: `make test-single TESTFILE=2018-06-02-jsconf-eu-2018.yaml`
.PHONY: test-single
test-single: build-image
	docker run -t --rm \
	  --workdir $(TARGET_DIR) \
	  --mount type=bind,source=$(CURDIR),target=$(TARGET_DIR) \
	  $(IMAGE_NAME) \
	  jest --expand ./test ${TESTFILE}

# Genereate /sitemap.txt
.PHONY: generate-sitemap
generate-sitemap: build-image
	> sitemap.txt
	docker run -t --rm \
	  --workdir $(TARGET_DIR) \
	  --mount type=bind,source=$(CURDIR),target=$(TARGET_DIR) \
	  $(IMAGE_NAME) \
	  node ./tools/generate-sitemap.js

# Generate /data/conferences.json
.PHONY: generate-conferences-json
generate-conferences-json: build-image
	> data/conferences.json
	docker run -t --rm \
	  --workdir $(TARGET_DIR) \
	  --mount type=bind,source=$(CURDIR),target=$(TARGET_DIR) \
	  $(IMAGE_NAME) \
	  node ./tools/generate-conferences-json.js

# Generate /data/youtube-channels.json
.PHONY: generate-youtube-channels-json
generate-youtube-channels-json: build-image
	> data/youtube-channels.json
	docker run -t --rm \
	  --workdir $(TARGET_DIR) \
	  --mount type=bind,source=$(CURDIR),target=$(TARGET_DIR) \
	  $(IMAGE_NAME) \
	  node ./tools/generate-youtube-channels-json.js

# Generate /data/youtube-playlists.json
.PHONY: generate-youtube-playlists-json
generate-youtube-playlists-json: build-image
	> data/youtube-playlists.json
	docker run -t --rm \
	  --workdir $(TARGET_DIR) \
	  --mount type=bind,source=$(CURDIR),target=$(TARGET_DIR) \
	  $(IMAGE_NAME) \
	  node ./tools/generate-youtube-playlists-json.js

# Build Docker image for tests and tooling
.PHONY: build-image
build-image:
	docker build -f Dockerfile -t $(IMAGE_NAME) .
