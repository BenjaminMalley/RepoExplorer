Repo Explorer
=============

Repo Explorer is a basic angularjs app for browsing git repos using GitHub's API.

## Getting Started

Repo Explorer requires ```node.js``` and ```GNU make``` to build and run. On OS X with homebrew, node is installed via

```
brew install node
```

To install development dependencies:

```
make install
```

## Running the app

The backend is powered by a development server that serves the static angular files and proxies API calls to GitHub. To run:

```
make server
```

Once the server is up and running, point your browser to `http://127.0.0.1:8000`.

## Running the tests

There are separate make targets for unit and end-to-end tests, ```make unit``` and ```make e2e``` respectively. To run both unit and end-to-end tests:

```
make test
```

