.PHONY: build-netlify
build-netlify: prepare-netlify test-netlify tools-generate-conferences-json-netlify tools-generate-sitemap-netlify

.PHONY: test
test: build-test-image
	docker run -t --rm \
	  -v `pwd`/test:/app/test \
	  -v `pwd`/data:/app/data \
	  -v `pwd`/examples:/app/examples \
	  -v `pwd`/js/utils:/app/js/utils\
	  confpad-test jest --silent --bail --expand /app/test

.PHONY: prepare-netlify
prepare-netlify:
	npm install -g jest
	npm install glob
	npm install js-yaml
	npm install slugify

.PHONY: test-netlify
test-netlify:
	jest --silent --bail --expand test

.PHONY: tools-simple-list
tools-simple-list: build-tools-image
	docker run -t --rm \
	  -v `pwd`/tools:/app/tools \
	  -v `pwd`/data:/app/data \
	  confpad-tools \
	  node ./tools/simple-list.js $$FILE

.PHONY: tools-generate-sitemap
tools-generate-sitemap: build-tools-image
	> sitemap.txt
	docker run -t --rm \
	  -v `pwd`/tools:/app/tools \
	  -v `pwd`/data:/app/data \
	  -v `pwd`/js/utils:/app/js/utils\
	  -v `pwd`/sitemap.txt:/app/sitemap.txt \
	  confpad-tools \
	  node ./tools/generate-sitemap.js

.PHONY: tools-generate-sitemap-netlify
tools-generate-sitemap-netlify:
	node ./tools/generate-sitemap.js

.PHONY: tools-generate-conferences-json
tools-generate-conferences-json: build-tools-image
	> data/conferences.json
	docker run -t --rm \
	  -v `pwd`/tools:/app/tools \
	  -v `pwd`/data:/app/data \
	  -v `pwd`/js/utils:/app/js/utils\
	  -v `pwd`/data/conferences.json:/app/data/conferences.json \
	  confpad-tools \
	  node ./tools/generate-conferences-json.js

.PHONY: tools-generate-conferences-json-netlify
tools-generate-conferences-json-netlify:
	node ./tools/generate-conferences-json.js

.PHONY: build-test-image
build-test-image:
	docker build -f Dockerfile.test -t confpad-test .

.PHONY: build-tools-image
build-tools-image:
	docker build -f Dockerfile.tools -t confpad-tools .
