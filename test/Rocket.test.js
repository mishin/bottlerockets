import { expect } from 'chai'
import Rocket from '../src/Rocket'
import { join as pathJoin } from 'path'

const CLI_PATH = pathJoin(__dirname, '../src/bin/bottlerocket.js')

describe('Rocket', function () {
  describe('test commands', function () {
    this.timeout(10000)

    var rocket

    before(function () {
      rocket = new Rocket(pathJoin(__dirname, '../.rockets.js'), {
        argv: ['--require', 'babel-register']
      })
    })

    after(function () {
      rocket = null
    })

    describe('"pass" command', function () {
      it('should pass', function (done) {
        rocket.execute('pass').then((result) => {
          expect(result.tests).to.be.equal(result.passes)
          done()
        })
      })
    })

    describe('"fail" command', function () {
      it('should fail', function (done) {
        rocket.execute('fail').then((result) => {
          expect(result.tests).to.be.equal(result.failures)
          done()
        })
      })
    })
  })
})
