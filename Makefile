.PHONY: test

unit:
	node_modules/karma/bin/karma start config/karma.conf.js

e2e:
	node_modules/protractor/bin/webdriver-manager update
	node_modules/protractor/bin/protractor config/protractor-conf.js

test: unit e2e

server:
	node server.js

install:
	npm install
	bower install
