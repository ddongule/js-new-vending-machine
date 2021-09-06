import PurchaseModel, { ERROR_MESSAGE } from "../PurchaseModel";

describe("사용자는 상품 구매를 위해 금액을 충전할 수 있다.", () => {
  test("10으로 나누어 떨어지지 않는 금액을 충전하려고 할 경우 에러가 발생해야 한다.", () => {
    // given
    const purchaseModel = new PurchaseModel();

    // when
    const charge = () => {
      purchaseModel.chargeCash(11);
    };

    // then
    expect(charge).toThrow(ERROR_MESSAGE.CHARGE_AMOUNT.IS_NOT_MOD_10);
  });

  test("10으로 나누어 떨어지지만 음수인 금액을 충전하려고 할 경우 에러가 발생해야 한다.", () => {
    // given
    const purchaseModel = new PurchaseModel();

    // when
    const charge = () => {
      purchaseModel.chargeCash(-10);
    };

    // then
    expect(charge).toThrow(ERROR_MESSAGE.CHARGE_AMOUNT.IS_NEGATIVE);
  });

  test("금액은 누적으로 충전이 가능해야 한다.", () => {
    // given
    const purchaseModel = new PurchaseModel();

    // when
    const first = 1000;
    const second = 500;
    purchaseModel.chargeCash(first);
    purchaseModel.chargeCash(second);

    // then
    expect(purchaseModel.getRemainingAmount()).toEqual(first + second);
  });
});
