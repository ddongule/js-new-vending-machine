export const ERROR_MESSAGE = {
  CHARGE_AMOUNT: {
    IS_NOT_MOD_10: "10원으로 나누어 떨어지는 금액만 충전이 가능합니다.",
    IS_NEGATIVE: "음수는 입력할 수 없습니다.",
  },
};

export default class PurchaseModel {
  constructor() {
    this.remainingAmount = 0;
  }

  chargeCash(chargeAmount) {
    let amount = Number(chargeAmount);
    const isMod10 = amount % 10 === 0;
    const isNegative = amount < 0;

    if (!isMod10) {
      throw new Error(ERROR_MESSAGE.CHARGE_AMOUNT.IS_NOT_MOD_10);
    }

    if (isNegative) {
      throw new Error(ERROR_MESSAGE.CHARGE_AMOUNT.IS_NEGATIVE);
    }

    this.remainingAmount += amount;
  }

  getRemainingAmount() {
    return this.remainingAmount;
  }

  buy(price) {
    this.remainingAmount -= price;
  }

  flush() {
    const remainingAmount = this.remainingAmount;
    this.remainingAmount = 0;

    return remainingAmount;
  }
}
