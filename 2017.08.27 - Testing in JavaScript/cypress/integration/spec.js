// little helper to select 'data-test="..."' elements
const dataTest = s => `[data-test="${s}"]`
const dt = dataTest

describe('Calculator', () => {
  beforeEach(() => {
    // setup before each test
    cy.visit('/')
  })

  it('loads calculator', () => {
    cy
      .get(dataTest('buttons'))
      .should('be.visible')
      // has 0..9 + "C" + "remove button"
      .find('button')
      .should('have.length', 12)
  })

  it('loads operations buttons', () => {
    cy
      .get(dataTest('operations'))
      .should('be.visible')
      .find('button')
      .should('have.length', 4)
  })

  it('starts with zero', () => {
    cy.get(dataTest('result')).contains(0)
  })

  it('adds 11 + 23', () => {
    cy.get(dt('1')).click()
    cy.get(dt('1')).click()
    cy.get(dt('+')).click()
    cy.get(dt('2')).click()
    cy.get(dt('3')).click()
    cy.get(dt('calculate')).click()
    cy.get(dt('result')).contains(34)
  })

  // instead of using "data-test" selectors
  // can just select the text directly
  it('adds 11 + 23 using text directly', () => {
    cy.contains('button', 1).click()
    cy.contains('button', 1).click()
    cy.contains('button', '+').click()

    cy.contains('button', 2).click()
    cy.contains('button', 3).click()
    cy.contains('button', '=').click()

    cy.get(dt('result')).contains(34)
  })

  it('removes digits one by one', () => {
    cy.get(dt('1')).click()
    cy.get(dt('2')).click()
    cy.get(dt('5')).click()
    cy.get(dt('8')).click()
    cy.get(dt('result')).contains(1258)
    cy.get(dt('remove')).click()
    cy.get(dt('result')).contains(125)
    cy.get(dt('remove')).click()
    cy.get(dt('result')).contains(12)
    cy.get(dt('remove')).click()
    cy.get(dt('result')).contains(1)
    cy.get(dt('remove')).click()
    cy.get(dt('result')).contains(0)
  })

  context('without boilerplate using aliases', () => {
    beforeEach(() => {
      // save all buttons as aliases
      // so later we can get it using cy.get('@<alias>')
      cy.get(dt('1')).as('1')
      cy.get(dt('2')).as('2')
      cy.get(dt('3')).as('3')
      cy.get(dt('4')).as('4')
      cy.get(dt('5')).as('5')
      cy.get(dt('6')).as('6')
      cy.get(dt('7')).as('7')
      cy.get(dt('8')).as('8')
      cy.get(dt('9')).as('9')
      cy.get(dt('0')).as('0')
      // operations
      cy.get(dt('+')).as('+')
      cy.get(dt('-')).as('-')
      cy.get(dt('*')).as('*')
      cy.get(dt('calculate')).as('=')
      // result
      cy.get(dt('result')).as('result')
    })

    it('multiplies numbers', () => {
      cy
        .get('@1')
        .click()
        .get('@2')
        .click()
        .get('@*')
        .click()
        .get('@5')
        .click()
        .get('@=')
        .click()
        .get('@result')
        .contains(60)
    })
  })
})
