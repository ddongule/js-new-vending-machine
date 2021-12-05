/**
 * 잔돈 계산 모듈
 * - 최소 개수의 동전으로 잔돈을 돌려준다.
 *   예) 1000원 넣고 650원짜리 음료를 선택했다면, 잔돈은 100, 100, 100, 50원으로 반환한다.
 * - 지폐를 잔돈으로 반환하는 경우는 없다.
 * - 모든 금액에 대해 잔돈을 반환할 수 없는 경우 잔돈으로 반환할 수 있는 금액만 반환한다.
 *   예) 동전이 500,100,50,10원이 각각 1개씩 있는데 654원을 반환해야하는 경우 50원(1개), 100원(1개), 50원(1개) 총 3개를 반환하고, 4원은 반환하지 않는다.
 */

const TEMPLATES = {
  COIN_CHANGE: `
        <h3>잔돈</h3>
        <button id="coin-return-button">반환하기</button>
        <table class="cashbox-change">
            <colgroup>
                <col>
                <col>
            </colgroup>
            <thead>
            <tr>
                <th>동전</th>
                <th>개수</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>500원</td>
                <td id="coin-500-quantity"></td>
            </tr>
            <tr>
                <td>100원</td>
                <td id="coin-100-quantity"></td>
            </tr>
            <tr>
                <td>50원</td>
                <td id="coin-50-quantity"></td>
            </tr>
            <tr>
                <td>10원</td>
                <td id="coin-10-quantity"></td>
            </tr>
            </tbody>
        </table>
    `,
  CASHBOX: `
        <h3>자판기 돈통 충전하기</h3>
        <div class='vending-machine-wrapper'>
            <input type="number" name="vending-machine-charge-amount" id="vending-machine-charge-input" autofocus>
            <button id="vending-machine-charge-button">충전하기</button>
        </div>
        <p>보유 금액: <span id="vending-machine-charge-amount"></span>원</p>        <h3>동전 보유 현황</h3>
        <table class="cashbox-remaining">
            <colgroup>
                <col>
                <col>
            </colgroup>
            <thead>
            <tr>
                <th>동전</th>
                <th>개수</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>500원</td>
                <td id="vending-machine-coin-500-quantity"></td>
            </tr>
            <tr>
                <td>100원</td>
                <td id="vending-machine-coin-100-quantity"></td>
            </tr>
            <tr>
                <td>50원</td>
                <td id="vending-machine-coin-50-quantity"></td>
            </tr>
            <tr>
                <td>10원</td>
                <td id="vending-machine-coin-10-quantity"></td>
            </tr>
            </tbody>
        </table>
    `,
};

export default class CashboxView {
  constructor(targetElement) {
    this.parentElement = targetElement;
    this.coinChangeSection = this.generateCoinChangeSection();
    this.cashboxSection = this.generateCashboxSection();
  }

  generateCoinChangeSection() {
    const containerElement = document.createElement("section");
    containerElement.innerHTML = TEMPLATES.COIN_CHANGE;

    return containerElement;
  }

  generateCashboxSection() {
    const containerElement = document.createElement("section");
    containerElement.innerHTML = TEMPLATES.CASHBOX;

    return containerElement;
  }

  render() {
    this.parentElement.appendChild(this.cashboxSection);
  }

  renderChangeCoinSection(targetElement) {
    targetElement.appendChild(this.coinChangeSection);
  }
}
