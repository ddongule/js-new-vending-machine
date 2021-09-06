import InventoryModel, { ERROR_MESSAGE } from "../InventoryModel";

describe("상품을 추가할 수 있다.", () => {
  test("추가하는 상품의 상품명, 가격, 수량이 공백이면 에러가 발생해야 한다.", () => {
    // given
    const inventoryModel = new InventoryModel();
    const name = "콜라";
    const price = 100;
    const quantity = 5;

    // when
    const addEmptyName = () => {
      inventoryModel.addProduct({ name: "", price, quantity });
    };
    const addEmptyPrice = () => {
      inventoryModel.addProduct({ name, price: "", quantity });
    };
    const addEmptyQuantity = () => {
      inventoryModel.addProduct({ name, price, quantity: "" });
    };

    // then
    expect(addEmptyName).toThrow(ERROR_MESSAGE.ADD_PRODUCT.IS_EMPTY);
    expect(addEmptyPrice).toThrow(ERROR_MESSAGE.ADD_PRODUCT.IS_EMPTY);
    expect(addEmptyQuantity).toThrow(ERROR_MESSAGE.ADD_PRODUCT.IS_EMPTY);
  });

  test("추가하는 상품의 수량이 1개보다 적으면 에러가 발생해야 한다.", () => {
    // given
    const inventoryModel = new InventoryModel();
    const name = "콜라";
    const price = 100;
    const quantity = 0;

    // when
    const add = () => {
      inventoryModel.addProduct({ name, price, quantity });
    };

    // then
    expect(add).toThrow(ERROR_MESSAGE.ADD_PRODUCT.IS_LESS_THAN_MIN_QUANTITY);
  });

  test("추가하는 상품의 가격이 100원보다 작다면 에러가 발생해야 한다.", () => {
    // given
    const inventoryModel = new InventoryModel();
    const name = "콜라";
    const price = 90;
    const quantity = 1;

    // when
    const add = () => {
      inventoryModel.addProduct({ name, price, quantity });
    };

    // then
    expect(add).toThrow(ERROR_MESSAGE.ADD_PRODUCT.IS_LESS_THAN_MIN_PRICE);
  });

  test("추가하는 상품의 가격이 10원으로 나누어 떨어지지 않는다면 에러가 발생해야 한다.", () => {
    // given
    const inventoryModel = new InventoryModel();
    const name = "콜라";
    const price = 111;
    const quantity = 1;

    // when
    const add = () => {
      inventoryModel.addProduct({ name, price, quantity });
    };

    // then
    expect(add).toThrow(ERROR_MESSAGE.ADD_PRODUCT.IS_NOT_MOD10);
  });

  test("같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체되어야 한다.", () => {
    // given
    const inventoryModel = new InventoryModel();
    const name = "콜라";
    const first = {
      name,
      price: 1000,
      quantity: 12,
    };
    const second = {
      name,
      price: 1500,
      quantity: 10,
    };

    // when
    inventoryModel.addProduct(first);
    inventoryModel.addProduct(second);

    // then
    const product = inventoryModel.findProductByName(name);

    expect(product.price).toEqual(second.price);
    expect(product.quantity).toEqual(second.quantity);
  });
});
