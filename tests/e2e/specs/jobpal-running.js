module.exports = {
  beforeEach: (browser) => browser.init(),

  'Logo in top right': (browser) => {
    const homepage = browser.page.homepage()
    homepage.waitForElementVisible('@appContainer')

    const app = homepage.section.app
    app.expect.element('@headline').to.be.visible
    app.expect.element('@headline').text.to.match(/^JOBPAL$/)

    browser.end()
  },

  'Jobs are displayed': (browser) => {
    const homepage = browser.page.homepage()
    homepage.waitForElementVisible('@appContainer')

    const app = homepage.section.app
    app.expect.element('@jobs').to.be.visible

    browser.end()
  }
}
