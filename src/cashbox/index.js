/**
 * 잔돈 계산 모듈
 * - 최소 개수의 동전으로 잔돈을 돌려준다.
 *   예) 1000원 넣고 650원짜리 음료를 선택했다면, 잔돈은 100, 100, 100, 50원으로 반환한다.
 * - 지폐를 잔돈으로 반환하는 경우는 없다.
 * - 모든 금액에 대해 잔돈을 반환할 수 없는 경우 잔돈으로 반환할 수 있는 금액만 반환한다.
 *   예) 동전이 500,100,50,10원이 각각 1개씩 있는데 654원을 반환해야하는 경우 50원(1개), 100원(1개), 50원(1개) 총 3개를 반환하고, 4원은 반환하지 않는다.
 */
export default class Cashbox {
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
    this.chargeAmountInput = document.getElementById("vending-machine-charge-input");
    this.chargeButtonElement = document.getElementById("vending-machine-charge-button");

    this.coin500 = document.getElementById("vending-machine-coin-500-quantity");
    this.coin100 = document.getElementById("vending-machine-coin-100-quantity");
    this.coin50 = document.getElementById("vending-machine-coin-50-quantity");
    this.coin10 = document.getElementById("vending-machine-coin-10-quantity");
    this.chargeResult = document.getElementById("vending-machine-charge-amount");
  }

  bindEvents() {
    this.chargeButtonElement.addEventListener("click", this.handleClickChargeButton.bind(this));
  }

  renderView() {
    this.view.render();
  }

  handleClickChargeButton(e) {
    const chargeAmount = this.chargeAmountInput.value;

    try {
      this.model.chargeCoin(chargeAmount);
      this.updateCashbox();
    } catch (error) {
      this.showAlert(error);
    }
  }

  showAlert(errorMessage) {
    alert(errorMessage);
  }

  updateCashbox() {
    const chargedCoins = this.model.getFormattedRemainingCoins();
    const chargedSum = this.model.getRemainingSum();

    this.coin500.innerText = chargedCoins[500];
    this.coin100.innerText = chargedCoins[100];
    this.coin50.innerText = chargedCoins[50];
    this.coin10.innerText = chargedCoins[10];
    this.chargeResult.innerText = chargedSum;
  }

  renderChangeCoinSection(targetElement) {
    this.view.renderChangeCoinSection(targetElement);

    this.returnedCoin500 = document.getElementById("coin-500-quantity");
    this.returnedCoin100 = document.getElementById("coin-100-quantity");
    this.returnedCoin50 = document.getElementById("coin-50-quantity");
    this.returnedCoin10 = document.getElementById("coin-10-quantity");
  }

  returnChangeCoins(changeAmount) {
    const returnedCoins = this.model.returnFormattedChange(changeAmount);
    this.updateCashbox();

    return returnedCoins;
  }

  updateChangeCoinSection(returnedCoins) {
    this.returnedCoin500.innerText = returnedCoins[500];
    this.returnedCoin100.innerText = returnedCoins[100];
    this.returnedCoin50.innerText = returnedCoins[50];
    this.returnedCoin10.innerText = returnedCoins[10];
  }
}
