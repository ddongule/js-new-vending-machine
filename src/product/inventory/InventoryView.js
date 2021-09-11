const TEMPLATES = {
  INVENTORY_TABLE: `
        <h3>상품 추가하기</h3>
        <input type="text" id="product-name-input" placeholder="상품명">
        <input type="number" id="product-price-input" placeholder="가격">
        <input type="number" id="product-quantity-input" placeholder="수량">
        <button id="product-add-button">추가하기</button>
        <table class="product-inventory">
            <colgroup>
                <col style="width: 140px">
                <col style="width: 100px">
                <col style="width: 100px">
            </colgroup>
            <thead>
            <tr>
                <th>상품명</th>
                <th>가격</th>
                <th>수량</th>
            </tr>
            </thead>
            <tbody id="product-inventory-container">
            </tbody>
        </table>
        `,
  SINGLE_PRODUCT: `
        <tr>
            <td class="product-manage-name">{name}</td>
            <td class="product-manage-price">{price}</td>
            <td class="product-manage-quantity">{quantity}</td>
        </tr>
    `,
};

export default class InventoryView {
  constructor(targetElement) {
    this.parentElement = targetElement;
    this.inventory = this.generateInventoryTable();
  }

  generateInventoryTable() {
    const containerElement = document.createElement("section");
    containerElement.innerHTML = TEMPLATES.INVENTORY_TABLE;

    return containerElement;
  }

  generateProductRows(productList) {
    return productList
      .map(({ name, price, quantity }) => {
        const productTemplate = TEMPLATES.SINGLE_PRODUCT.replace("{name}", name)
          .replace("{price}", price)
          .replace("{quantity}", quantity);

        return productTemplate;
      })
      .join("");
  }

  generateProductRow({ name, price, quantity }) {
    const tr = document.createElement("tr");
    tr.innerHTML = TEMPLATES.SINGLE_PRODUCT.replace("{name}", name)
      .replace("{price}", price)
      .replace("{quantity}", quantity);

    return tr;
  }

  render() {
    this.parentElement.appendChild(this.inventory);
  }
}
