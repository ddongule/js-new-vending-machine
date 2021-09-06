import Cashbox from "./cashbox/index.js";
import CashboxModel from "./cashbox/CashboxModel.js";
import CashboxView from "./cashbox/CashboxView.js";
import Purchase from "./product/purchase/index.js";
import PurchaseModel from "./product/purchase/PurchaseModel.js";
import PurchaseView from "./product/purchase/PurchaseView.js";
import Inventory from "./product/inventory/index.js";
import InventoryModel from "./product/inventory/InventoryModel.js";
import InventoryView from "./product/inventory/InventoryView.js";

export default class VendingMachineApp {
  constructor() {
    this.getElements();
    this.createModules();
    this.bindEvents();

    this.purchaseMenuInitiated = false;
  }

  getElements() {
    this.targetElement = document.getElementById("app");

    this.cashboxMenuButton = document.getElementById("vending-machine-manage-menu");
    this.inventoryMenuButton = document.getElementById("product-manage-menu");
    this.purchaseMenuButton = document.getElementById("product-purchase-menu");
  }

  createModules() {
    this.cashbox = new Cashbox(new CashboxModel(), new CashboxView(this.targetElement));
    this.purchase = new Purchase(new PurchaseModel(), new PurchaseView(this.targetElement));
    this.inventory = new Inventory(
      new InventoryModel(),
      new InventoryView(this.targetElement),
      this.purchase,
    );
  }

  bindEvents() {
    this.cashboxMenuButton.addEventListener("click", this.showCashBoxMenu.bind(this));
    this.inventoryMenuButton.addEventListener("click", this.showInventoryMenu.bind(this));
    this.purchaseMenuButton.addEventListener("click", this.showPurchaseMenu.bind(this));
  }

  init() {
    this.cashbox.init();
  }

  clear() {
    this.targetElement.innerHTML = "";
  }

  showCashBoxMenu() {
    this.clear();
    this.cashbox.init();
  }

  showInventoryMenu() {
    this.clear();
    this.inventory.init();
  }

  showPurchaseMenu() {
    this.clear();
    this.purchase.init();
    this.cashbox.renderChangeCoinSection(this.targetElement);

    if (!this.purchaseMenuInitiated) {
      this.bindPurchaseMenuEvents();
      this.purchaseMenuInitiated = true;
    }
  }

  bindPurchaseMenuEvents() {
    this.availableProducts = document.querySelector(".purchase-available");
    this.availableProducts.addEventListener("click", this.handleClickBuy.bind(this));

    this.coinReturnButtonElement = document.getElementById("coin-return-button");
    this.coinReturnButtonElement.addEventListener(
      "click",
      this.handleClickCoinReturnButton.bind(this),
    );
  }

  handleClickBuy(e) {
    const target = e.target;

    if (target.className !== "purchase-button") return;

    const targetProductElement = target.parentElement.parentElement;
    const quantity = Number(
      targetProductElement.querySelector(".product-purchase-quantity").dataset.productQuantity,
    );
    const price = Number(
      targetProductElement.querySelector(".product-purchase-price").dataset.productPrice,
    );
    const name = targetProductElement.querySelector(".product-purchase-name").dataset.productName;

    this.buyProduct({ name, price, quantity });
  }

  buyProduct({ name, price, quantity }) {
    if (quantity === 0) {
      alert("수량이 0인 상품은 구매할 수 없습니다.");
      return;
    }

    this.purchase.buy(price);
    this.inventory.buy(name);

    this.purchase.updateChargedAmount();
    this.inventory.updateInventory();
  }

  handleClickCoinReturnButton() {
    const remainingCash = this.purchase.flushCash();
    const returnedCoins = this.cashbox.returnChangeCoins(remainingCash);

    this.cashbox.updateChangeCoinSection(returnedCoins);
  }
}
