.PHONY: build-netlify
build-netlify: test-netlify tools-generate-sitemap-netlify

.PHONY: test
test: build-test-image
	docker run -t --rm \
	  -v `pwd`/jest.config.js:/app/jest.config.js \
	  -v `pwd`/test:/app/test \
	  -v `pwd`/data:/app/data \
	  -v `pwd`/examples:/app/examples \
	  -v `pwd`/js/utils:/app/js/utils\
	  confpad-test

.PHONY: test-netlify
test-netlify:
	npm install -g jest
	npm install glob
	npm install js-yaml
	npm install slugify
	jest test

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

.PHONY: build-test-image
build-test-image:
	docker build -f Dockerfile.test -t confpad-test .

.PHONY: build-tools-image
build-tools-image:
	docker build -f Dockerfile.tools -t confpad-tools .
