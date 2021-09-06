export const ERROR_MESSAGE = {
  ADD_PRODUCT: {
    IS_EMPTY: "공백을 입력할 수 없습니다.",
    IS_LESS_THAN_MIN_QUANTITY: "상품 수량은 최소 1개여야 합니다.",
    IS_LESS_THAN_MIN_PRICE: "상품 가격은 최소 100원이어야 합니다.",
    IS_NOT_MOD10: "상품 가격은 10원으로 나누어 떨어져야 합니다.",
  },
};

export default class InventoryModel {
  constructor() {
    this.products = [];
    this.minQuantity = 1;
    this.minPrice = 100;
  }

  addProduct({ name, price, quantity }) {
    if (name === "" || price === "" || quantity === "") {
      throw new Error(ERROR_MESSAGE.ADD_PRODUCT.IS_EMPTY);
    }

    if (quantity < this.minQuantity) {
      throw new Error(ERROR_MESSAGE.ADD_PRODUCT.IS_LESS_THAN_MIN_QUANTITY);
    }

    if (price < this.minPrice) {
      throw new Error(ERROR_MESSAGE.ADD_PRODUCT.IS_LESS_THAN_MIN_PRICE);
    }

    if (price % 10 !== 0) {
      throw new Error(ERROR_MESSAGE.ADD_PRODUCT.IS_NOT_MOD10);
    }

    const sameNameProductIndex = this.findProductIndexByName(name);
    const isExistSameNameProduct = sameNameProductIndex !== -1;

    if (isExistSameNameProduct) {
      this.products.splice(sameNameProductIndex, 1, { name, price, quantity });
    } else {
      this.products.push({ name, price, quantity });
    }
  }

  findProductIndexByName(name) {
    const foundIndex = this.products.findIndex(product => product.name === name);

    return foundIndex;
  }

  findProductByName(name) {
    const found = this.products.find(product => product.name === name);

    return found;
  }

  buy(productName) {
    const boughtId = this.findProductIndexByName(productName);
    this.products[boughtId].quantity -= 1;
  }
}
