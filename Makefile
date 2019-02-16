.PHONY: test
test: image-test
	docker run -t --rm \
	  -v `pwd`/jest.config.js:/app/jest.config.js \
	  -v `pwd`/test:/app/test \
	  -v `pwd`/data:/app/data \
	  -v `pwd`/examples:/app/examples \
	  confpad-test

.PHONY: test-netlify
test-netlify:
	npm install -g jest
	npm install glob
	npm install js-yaml
	jest test

.PHONY: tools-simple-list
tools-simple-list: image-tools
	docker run -t --rm \
	  -v `pwd`/tools:/app/tools \
	  -v `pwd`/data:/app/data \
	  confpad-tools \
	  node ./tools/simple-list.js $$FILE

.PHONY: image-test
image-test:
	docker build -f Dockerfile.test -t confpad-test .

.PHONY: image-tools
image-tools:
	docker build -f Dockerfile.tools -t confpad-tools .
