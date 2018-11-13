const cy = require('cypress');

async function bootRun(params) {
  const url = 'https://www.facebook.com/cupemag'
  cy.visit(url)
  
}

module.exports = bootRun;