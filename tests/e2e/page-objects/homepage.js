module.exports = {
  url: '/',
  commands: [],
  elements: {
    appContainer: '#app'
  },
  sections: {
    app: {
      selector: '#app',

      elements: {
        headline: {
          selector: '#app-title'
        },
        jobs: {
          selector: '#jobs-table tbody'
        }
      }
    }
  }
}
