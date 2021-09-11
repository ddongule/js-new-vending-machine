export const clearInputs = (...inputs) => {
  inputs.forEach(input => {
    cy.get(input).clear();
  });
};

export const mockPickNumberInList = output => {
  cy.window().then(win => {
    const mock = cy.stub(win.WoowaUtil.Random, "pickNumberInList");

    mock.callsFake(() => output);
  });
};

export const extractValueFromSuffix = suffix => value => value.split(suffix)[0].trim();
