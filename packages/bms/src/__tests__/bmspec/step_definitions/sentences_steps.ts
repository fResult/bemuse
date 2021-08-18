import steps from '../cucumber-dsl'
import { expect } from 'chai'

export default steps()
  .Then(/^there should be (\d+) header sentences?$/, function (n) {
    expect(this.result.headerSentences).to.equal(+n)
  })

  .Then(/^there should be (\d+) channel sentences?$/, function (n) {
    expect(this.result.channelSentences).to.equal(+n)
  })
