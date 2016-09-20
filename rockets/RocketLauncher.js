command('pass')
  .description('Pass always')
  .action(function () {
    it('should always pass', function () {
      expect(1).to.be.equal(1)
    })
  })

command('fail')
  .description('Fail always')
  .action(function () {
    it('should always fail', function () {
      expect(1).to.be.equal(0)
    })
  })
