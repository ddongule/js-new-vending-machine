export default class Purchase {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initiated = false;
  }

  init() {
    if (!this.initiated) {
      this.renderView();
      this.getElements();
      this.bindEvents();
      this.setInitiated(true);
    } else {
      this.renderView();
    }
  }

  setInitiated(initiated) {
    this.initiated = initiated;
  }

  getElements() {
    this.chargeAmountInput = document.getElementById("charge-input");
    this.chargeButtonElement = document.getElementById("charge-button");
    this.chargedAmount = document.getElementById("charge-amount");
  }

  bindEvents() {
    this.chargeButtonElement.addEventListener("click", this.handleClickChargeButton.bind(this));
  }

  renderView() {
    this.view.render();
  }

  handleClickChargeButton() {
    const chargeAmount = this.chargeAmountInput.value;

    try {
      this.model.chargeCash(chargeAmount);
      this.updateChargedAmount();
    } catch (error) {
      this.showAlert(error);
    }
  }

  showAlert(errorMessage) {
    alert(errorMessage);
  }

  updateChargedAmount() {
    const currentAmount = this.model.getRemainingAmount();

    this.chargedAmount.innerText = currentAmount;
  }

  updateAvailableProducts(products) {
    this.view.updateProductTable(products);
  }

  buy(price) {
    this.model.buy(price);
  }

  flushCash() {
    const remainingCash = this.model.flush();
    this.updateChargedAmount();

    return remainingCash;
  }
}
