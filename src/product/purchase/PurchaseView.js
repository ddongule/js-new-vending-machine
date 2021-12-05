/**
 * 잔돈 계산 모듈
 * - 최소 개수의 동전으로 잔돈을 돌려준다.
 *   예) 1000원 넣고 650원짜리 음료를 선택했다면, 잔돈은 100, 100, 100, 50원으로 반환한다.
 * - 지폐를 잔돈으로 반환하는 경우는 없다.
 * - 모든 금액에 대해 잔돈을 반환할 수 없는 경우 잔돈으로 반환할 수 있는 금액만 반환한다.
 *   예) 동전이 500,100,50,10원이 각각 1개씩 있는데 654원을 반환해야하는 경우 50원(1개), 100원(1개), 50원(1개) 총 3개를 반환하고, 4원은 반환하지 않는다.
 */

const TEMPLATES = {
  PURCHASE_CASH_CHARGE: `
      <div class='purchase-container'>
        <h3>충전하기</h3>
        <div class='vending-machine-wrapper'>
          <input type="number" name="charge-amount" id="charge-input">
          <button id="charge-button">충전하기</button>
        </div>
        <p>충전 금액: <span id="charge-amount"></span>원</p>
      </div>
    `,
  AVAILABLE_PRODUCT_TABLE: `
      <div class='product-container'>
        <table class="purchase-available">
            <colgroup>
                <col style="width: 140px">
                <col style="width: 100px">
                <col style="width: 100px">
                <col style="width: 100px">
            </colgroup>
            <thead>
            <tr>
                <th>상품명</th>
                <th>가격</th>
                <th>수량</th>
                <th>구매</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
      </div>
    `,
  SINGLE_PRODUCT: `
        <td class="product-purchase-name"></td>
        <td class="product-purchase-price"></td>
        <td class="product-purchase-quantity"></td>
        <td class="tg-baqh"><button class="purchase-button">구매하기</button></td>
    `,
};

export default class PurchaseView {
  constructor(targetElement) {
    this.parentElement = targetElement;
    this.cashChargeSection = this.generateCashChargeSection();
    this.productTableSection = this.generateProductTable();
  }

  generateCashChargeSection() {
    const containerElement = document.createElement("section");
    containerElement.innerHTML = TEMPLATES.PURCHASE_CASH_CHARGE;

    return containerElement;
  }

  generateProductTable() {
    const containerElement = document.createElement("section");
    containerElement.innerHTML = TEMPLATES.AVAILABLE_PRODUCT_TABLE;

    return containerElement;
  }

  updateProductTable(products) {
    const productTableBody = this.productTableSection.querySelector("tbody");
    const productTableFragment = document.createElement("tbody");

    products.forEach(({ name, price, quantity }) => {
      const singleProductRow = document.createElement("tr");
      singleProductRow.innerHTML = TEMPLATES.SINGLE_PRODUCT;

      const nameTd = singleProductRow.querySelector(".product-purchase-name");
      nameTd.innerText = name;
      nameTd.dataset.productName = name;

      const priceTd = singleProductRow.querySelector(".product-purchase-price");
      priceTd.innerText = price + "원";
      priceTd.dataset.productPrice = price;

      const quantityTd = singleProductRow.querySelector(".product-purchase-quantity");
      quantityTd.innerText = quantity + "개";
      quantityTd.dataset.productQuantity = quantity;

      productTableFragment.appendChild(singleProductRow);
    });

    productTableBody.innerHTML = productTableFragment.innerHTML;
  }

  render() {
    this.parentElement.appendChild(this.cashChargeSection);
    this.parentElement.appendChild(this.productTableSection);
  }
}
