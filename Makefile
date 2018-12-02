.PHONY: test
test:
	docker build -f Dockerfile.test -t confpad-test .
	docker run -t --rm \
	  -v `pwd`/jest.config.js:/app/jest.config.js \
	  -v `pwd`/test:/app/test \
	  -v `pwd`/data:/app/data \
	  -v `pwd`/examples:/app/examples \
	  confpad-test
