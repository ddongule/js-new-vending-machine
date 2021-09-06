export default class Inventory {
  constructor(model, view, purchase) {
    this.model = model;
    this.view = view;
    this.purchase = purchase;
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
    // 상품 추가
    this.productNameInput = document.getElementById("product-name-input");
    this.productPriceInput = document.getElementById("product-price-input");
    this.productQuantityInput = document.getElementById("product-quantity-input");
    this.addProductButton = document.getElementById("product-add-button");
    // 재고
    this.inventoryContainer = document.getElementById("product-inventory-container");
  }

  bindEvents() {
    this.addProductButton.addEventListener("click", this.handleAddProductButton.bind(this));
  }

  renderView() {
    this.view.render();
  }

  handleAddProductButton() {
    const name = this.productNameInput.value;
    const price = this.productPriceInput.value;
    const quantity = this.productQuantityInput.value;

    try {
      this.model.addProduct({ name, price, quantity });
      this.updateInventory();
    } catch (error) {
      this.showAlert(error);
    }
  }

  showAlert(errorMessage) {
    alert(errorMessage);
  }

  updateInventory() {
    const currentProducts = this.model.products;
    const productRowsHTML = this.view.generateProductRows(currentProducts);

    this.inventoryContainer.innerHTML = productRowsHTML;
    this.purchase.updateAvailableProducts(currentProducts);
  }

  buy(productName) {
    this.model.buy(productName);
  }
}
