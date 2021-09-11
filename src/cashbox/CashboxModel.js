/**
 * 잔돈 계산 모듈
 * - 최소 개수의 동전으로 잔돈을 돌려준다.
 *   예) 1000원 넣고 650원짜리 음료를 선택했다면, 잔돈은 100, 100, 100, 50원으로 반환한다.
 * - 지폐를 잔돈으로 반환하는 경우는 없다.
 * - 모든 금액에 대해 잔돈을 반환할 수 없는 경우 잔돈으로 반환할 수 있는 금액만 반환한다.
 *   예) 동전이 500,100,50,10원이 각각 1개씩 있는데 654원을 반환해야하는 경우 50원(1개), 100원(1개), 50원(1개) 총 3개를 반환하고, 4원은 반환하지 않는다.
 */
const formatCount = count => {
  return `${count}개`;
};
export const ERROR_MESSAGE = {
  CHARGE_AMOUNT: {
    IS_LESS_THAN_MIN: "최소 충전 금액은 100원입니다.",
    IS_NOT_MOD_10: "10원으로 나누어 떨어지는 금액만 충전이 가능합니다.",
  },
};

export default class CashboxModel {
  constructor() {
    this.remainingCoins = {
      500: 0,
      100: 0,
      50: 0,
      10: 0,
    };
    this.minimumChargeAmount = 100;
  }

  chargeCoin(chargeAmount) {
    let amount = chargeAmount;
    const isMod10 = amount % 10 === 0;
    const isLessThanMin = amount < this.minimumChargeAmount;

    if (isLessThanMin) {
      throw new Error(ERROR_MESSAGE.CHARGE_AMOUNT.IS_LESS_THAN_MIN);
    }

    if (!isMod10) {
      throw new Error(ERROR_MESSAGE.CHARGE_AMOUNT.IS_NOT_MOD_10);
    }

    const chargeCoins = { ...this.remainingCoins };

    while (amount > 0) {
      const selectedCoin = WoowaUtil.Random.pickNumberInList([500, 100, 50, 10]);

      if (selectedCoin > amount) {
        continue;
      }

      chargeCoins[selectedCoin] += 1;
      amount -= selectedCoin;
    }

    this.remainingCoins = chargeCoins;
  }

  getRemainingCoins() {
    return this.remainingCoins;
  }

  getFormattedRemainingCoins() {
    const formattedCoins = Object.entries(this.remainingCoins).reduce((result, [coin, count]) => {
      return {
        ...result,
        [coin]: formatCount(count),
      };
    }, {});

    return formattedCoins;
  }

  getRemainingSum() {
    return Object.entries(this.remainingCoins).reduce((sum, [coin, count]) => {
      return sum + coin * count;
    }, 0);
  }

  returnChange(returnAmount) {
    let amount = returnAmount;
    const coinsInDescending = Object.keys(this.remainingCoins).sort((a, b) => b - a);

    const returnCoins = coinsInDescending.reduce((result, coin) => {
      const maxCount = Math.floor(amount / coin);
      const remainingCount = this.remainingCoins[coin];
      const availableCount = remainingCount > maxCount ? maxCount : remainingCount;

      amount -= availableCount * coin;
      this.remainingCoins[coin] -= availableCount;

      return { ...result, [coin]: availableCount };
    }, {});

    return returnCoins;
  }

  returnFormattedChange(returnAmount) {
    const returnCoins = this.returnChange(returnAmount);
    const formattedChange = Object.entries(returnCoins).reduce((result, [coin, count]) => {
      return {
        ...result,
        [coin]: formatCount(count),
      };
    }, {});

    return formattedChange;
  }
}
