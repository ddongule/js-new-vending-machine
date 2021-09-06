import Random from "../../lib/Random";
import CashboxModel, { ERROR_MESSAGE } from "../CashboxModel";

jest.mock("../../lib/Random");

describe("입력한 금액으로 자판기가 가지고 있을 동전을 무작위로 생성해 충전할 수 있다.", () => {
  test("100원보다 적은 금액을 충전하려고 할 경우 에러가 발생해야 한다.", () => {
    // given
    const cashboxModel = new CashboxModel();

    // when
    const charge = () => {
      cashboxModel.chargeCoin(10);
    };

    // then
    expect(charge).toThrow(ERROR_MESSAGE.CHARGE_AMOUNT.IS_LESS_THAN_MIN);
  });

  test("100원보다 크고 10으로 나누어 떨어지지 않는 금액을 충전하려고 할 경우 에러가 발생해야 한다.", () => {
    // given
    const cashboxModel = new CashboxModel();

    // when
    const charge = () => {
      cashboxModel.chargeCoin(1233);
    };

    // then
    expect(charge).toThrow(ERROR_MESSAGE.CHARGE_AMOUNT.IS_NOT_MOD_10);
  });

  test("100원보다 크고 10으로 나누어 떨어지는 금액을 충전하려고 할 경우 정상적으로 동전이 충전되어야 한다.", () => {
    // given
    const chargeAmount = 1000;
    const cashboxModel = new CashboxModel();
    const mockRandomUtil = jest
      .fn()
      .mockReturnValueOnce(500)
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(50)
      .mockReturnValueOnce(10)
      .mockReturnValueOnce(10)
      .mockReturnValueOnce(10)
      .mockReturnValueOnce(10)
      .mockReturnValueOnce(10);
    Random.pick = mockRandomUtil;

    // when
    cashboxModel.chargeCoin(chargeAmount);

    // then
    expect(cashboxModel.remainingCoins[500]).toEqual(1);
    expect(cashboxModel.remainingCoins[100]).toEqual(4);
    expect(cashboxModel.remainingCoins[50]).toEqual(1);
    expect(cashboxModel.remainingCoins[10]).toEqual(5);
    expect(cashboxModel.getRemainingSum()).toEqual(chargeAmount);
  });

  test("금액은 누적으로 충전할 수 있어야 한다.", () => {
    // given
    const cashboxModel = new CashboxModel();
    const mockRandomUtil = jest
      .fn()
      .mockReturnValueOnce(500)
      .mockReturnValueOnce(500)
      .mockReturnValueOnce(500);

    Random.pick = mockRandomUtil;

    // when
    const firstChargeAmount = 1000;
    cashboxModel.chargeCoin(firstChargeAmount);

    const secondChargeAmount = 500;
    cashboxModel.chargeCoin(secondChargeAmount);

    // then
    expect(cashboxModel.remainingCoins[500]).toEqual(3);
    expect(cashboxModel.getRemainingSum()).toEqual(firstChargeAmount + secondChargeAmount);
  });
});

describe("최소 개수의 동전으로 잔돈을 돌려줄 수 있다.", () => {
  test("잔돈 350원을 반환해야 하는 경우, 100원 3개, 50원을 반환해야 한다.", () => {
    const amount = 350;
    const cashboxModel = new CashboxModel();
    const returnedCoins = {
      500: 0,
      100: 3,
      50: 1,
      10: 0,
    };
    const mockRandomUtil = jest
      .fn()
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(50);
    Random.pick = mockRandomUtil;

    cashboxModel.chargeCoin(amount);

    expect(cashboxModel.returnChange(amount)).toEqual(returnedCoins);
  });

  test("잔돈 550원을 반환해야 하는 경우, 500원이 있다면 500원, 50원을 반환해야 한다.", () => {
    const amount = 550;
    const cashboxModel = new CashboxModel();
    const returnedCoins = {
      500: 1,
      100: 0,
      50: 1,
      10: 0,
    };

    const mockRandomUtil = jest.fn().mockReturnValueOnce(500).mockReturnValueOnce(50);
    Random.pick = mockRandomUtil;

    cashboxModel.chargeCoin(amount);

    expect(cashboxModel.returnChange(550)).toEqual(returnedCoins);
  });

  test("잔돈 550원을 반환해야 하는 경우, 500원이 없다면 100원 5개, 50원을 반환해야 한다.", () => {
    const amount = 550;
    const cashboxModel = new CashboxModel();
    const returnedCoins = {
      500: 0,
      100: 5,
      50: 1,
      10: 0,
    };
    const mockRandomUtil = jest
      .fn()
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(50);
    Random.pick = mockRandomUtil;

    cashboxModel.chargeCoin(amount);

    expect(cashboxModel.returnChange(amount)).toEqual(returnedCoins);
  });

  test("잔돈 654원을 반환해야 하는 경우, 500원, 100원, 50원을 반환하고, 4원은 반환하지 않아야 한다.", () => {
    const amount = 654;
    const cashboxModel = new CashboxModel();
    const returnedCoins = {
      500: 1,
      100: 1,
      50: 1,
      10: 0,
    };
    const mockRandomUtil = jest
      .fn()
      .mockReturnValueOnce(500)
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(50)
      .mockReturnValueOnce(50);
    Random.pick = mockRandomUtil;

    cashboxModel.chargeCoin(700);

    expect(cashboxModel.returnChange(amount)).toEqual(returnedCoins);
  });

  test("잔돈 1500원을 반환해야 하는 경우, 500원 3개를 반환해야 한다.", () => {
    const amount = 1500;
    const cashboxModel = new CashboxModel();
    const returnedCoins = {
      500: 3,
      100: 0,
      50: 0,
      10: 0,
    };
    const mockRandomUtil = jest
      .fn()
      .mockReturnValueOnce(500)
      .mockReturnValueOnce(500)
      .mockReturnValueOnce(500);
    Random.pick = mockRandomUtil;

    cashboxModel.chargeCoin(amount);

    expect(cashboxModel.returnChange(amount)).toEqual(returnedCoins);
  });

  test("자판기에 동전이 500원 1개 있고 잔돈 800원을 반환해야 하는 경우, 500원 1개를 반환해야 한다.", () => {
    const cashboxModel = new CashboxModel();
    const returnedCoins = {
      500: 1,
      100: 0,
      50: 0,
      10: 0,
    };
    const mockRandomUtil = jest.fn().mockReturnValueOnce(500);
    Random.pick = mockRandomUtil;

    cashboxModel.chargeCoin(500);

    expect(cashboxModel.returnChange(800)).toEqual(returnedCoins);
  });

  test("동전의 개수는 {개수}개 형식으로 포맷팅되어야 한다.", () => {
    const cashboxModel = new CashboxModel();
    const expected = {
      500: "1개",
      100: "2개",
      50: "3개",
      10: "4개",
    };
    const mockRandomUtil = jest
      .fn()
      .mockReturnValueOnce(500)
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(50)
      .mockReturnValueOnce(50)
      .mockReturnValueOnce(50)
      .mockReturnValueOnce(10)
      .mockReturnValueOnce(10)
      .mockReturnValueOnce(10)
      .mockReturnValueOnce(10);
    Random.pick = mockRandomUtil;

    cashboxModel.chargeCoin(700 + 150 + 40);

    expect(cashboxModel.returnFormattedChange()).toEqual(expected);
  });
});
