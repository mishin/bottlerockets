[WIP] This project is a work in progress and is not recommended for production use

-

[![Bottlerockets Logo](https://cldup.com/6434u5RKNS.png)](https://bottlerockets.github.io/)

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Bottlerockets is an efficient BDD command framework written in [Node.js](https://nodejs.org/) and streams task results with [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/). Bottlerockets can be used as a CLI tool or a task queue server to stream human readable statuses of tasks and their JSON results.

# Use Cases

- Run commands with expensive setup/teardown operations
- Run a persistent task queue server with mocha-filled results
- CLI interface for your project commands
- Run commands in a REPL environment
- Easily scale your bottlerockets

# Install

```
npm install -g bottlerockets
```

# Getting Started

Initialize `.rockets.js` in the root of your project directory:

```
bottlerockets init
```

This will create a `.rockets.js` file with an example:

```javascript
command('welcome')
  .description('This says hello to the enemy')
  .args({
    firstName: {
      type: String,
      required: true,
      default: 'Sam'
    },
    lastName: {
      type: String,
      required: true,
      default: 'Hunter'
    },
    intruder: {
      type: Boolean,
      default: false
    }
  })
  .action(function (task, args) {
    describe('first name', function () {
      it('is "John"', function () {
        expect(args.firstName).to.be.equal('John')
        task.name = args.firstName
      })
    })

    describe('last name', function () {
      it('is not "Doe"', function () {
        expect(args.lastName).to.not.be.equal('Doe')
        task.name += ' ' + args.lastName
      })
    })

    describe('is intruder', function () {
      it('should NOT be an intruder', function () {
        expect(args.intruder).to.be.equal(false)
      })
    })
  })
```

Then run the test bottlerocket command by running:

```
bottlerocket welcome --first-name John --last-name Henrick --intruder
```

# CLI

```
$ bottlerocket --help

  Usage: bottlerocket [options] <command> [args]

  Commands:

    welcome                 This says hello to the enemy
    help <cmd>              output help for command

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -r, --require <file>    require js files
    -R, --reporter [value]  mocha reporter (default: "spec")
    -V, --verbose <n>       set logging verbosity
```

# API

Create a queue with the Bottlerockets launcher:

```javascript
import Bottlerockets from 'bottlerockets'
import http from 'http'

const rockets = new Bottlerockets({
  // Allow up to 5 tasks per single bottlerocket process
  maxTasks: 10,

  // Launch up to 10 bottlerocket processes per instance
  // With maxTasks set to 10, this allows up to 80 tasks
  // to run simultaneously
  maxInstances: 8,

  // Shut down bottlerocket processes that have not been
  // used for 5 minutes
  sleep: 5,
})

// Launch 100 rockets at once
setInterval(function () {
  for (let i = 0; i < 100; i++) {
    rockets.launch('welcome', {
      firstName: 'John',
      lastName: 'Henrick',
      intruder: false,
    }).success(result => {
      console.log('result', result)
    }).catch(err => {
      console.error('error', err)
    })
  }
}, 1000)
```

## Documentation & Community

  - [Documentation](https://bottlerockets.github.io/docs)
  - [API](https://bottlerockets.github.io/api)
  - [Gitter](https://gitter.im/bottlerockets/bottlerockets)
  - [Wiki](https://github.com/bottlerockets/bottlerockets/wiki)

## License

MIT License. See [LICENSE.md](http://github.com/bottlerockets/bottlerockets/blob/master/LICENSE.md) file for details.

## Contributors

| Name           | GitHub                                  | Facebook                                   |
| -------------- | --------------------------------------- | ------------------------------------------ |
| **Sam Hunter** | [samhunta](https://github.com/samhunta) | [@samhuntr](https://facebook.com/samhuntr) |

[npm-image]: https://img.shields.io/npm/v/bottlerockets.svg
[npm-url]: https://npmjs.org/package/bottlerockets
[downloads-image]: https://img.shields.io/npm/dm/bottlerockets.svg
[downloads-url]: https://npmjs.org/package/bottlerockets
[coveralls-image]: https://img.shields.io/coveralls/bottlerockets/bottlerockets/master.svg
[coveralls-url]: https://coveralls.io/r/bottlerockets/bottlerockets?branch=master
