/// <reference types="cypress" />

import { CHANGE, CHARGE, MANAGE, MENU, PURCHASE, VENDING } from "../../fixtures/dom";
import { clearInputs } from "../../utils";

/**
 * CHECK LIST
 * 빈 값을 입력했을 때 예외 처리 필요
 *
 */

context("상품 구매", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
    cy.get(MENU.PURCHASE).click();

    const spy = cy.spy().as("alert");
    cy.on("window:alert", spy);
  });

  it("충전 금액에 해당하는 input에 빈 값을 입력한 후 충전하기 버튼을 누른 경우 alert을 띄운다.", () => {
    cy.get(CHARGE.BUTTON).click();

    cy.get("@alert").should("have.been.called");
  });

  it("충전 금액에 해당하는 input에 10원 미만의 값을 입력한 후 충전하기 버튼을 누른 경우 alert을 띄운다.", () => {
    cy.get(CHARGE.INPUT).type(5);
    cy.get(CHARGE.BUTTON).click();

    cy.get("@alert").should("have.been.called");
  });

  it("충전 금액에 해당하는 input에 10의 배수가 아닌 값을 입력한 후 충전하기 버튼을 누른 경우 alert을 띄운다.", () => {
    cy.get(CHARGE.INPUT).type(1111);
    cy.get(CHARGE.BUTTON).click();

    cy.get("@alert").should("have.been.called");
  });

  it("충전 금액 500원 충전하기, 1000원 충전하기를 누르면 충전 금액이 1500원이 된다.", () => {
    cy.get(CHARGE.INPUT).type(500);
    cy.get(CHARGE.BUTTON).click();

    clearInputs(CHARGE.INPUT);

    cy.get(CHARGE.INPUT).type(1000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(CHARGE.SPAN).last().should("have.text", "1500");
  });

  it("금액을 충전하여 상품 구매에 성공한 잔액이 구매한 금액만큼 감소한다.", () => {
    cy.get(MENU.MANAGE).click();
    cy.get(MANAGE.ADD_NAME).type("신상품");
    cy.get(MANAGE.ADD_PRICE).type(1500);
    cy.get(MANAGE.ADD_QUANTITY).type(150);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(10000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(PURCHASE.PRODUCT_BUTTON).last().click();
    cy.get(CHARGE.SPAN).last().should("have.text", "8500");
  });

  it("금액을 충전하여 상품 구매에 성공한 경우 해당 상품의 수량이 1감소 된다.", () => {
    cy.get(MENU.MANAGE).click();
    cy.get(MANAGE.ADD_NAME).type("신상품");
    cy.get(MANAGE.ADD_PRICE).type(1500);
    cy.get(MANAGE.ADD_QUANTITY).type(150);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(10000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(PURCHASE.PRODUCT_BUTTON).last().click();
    cy.get(PURCHASE.PRODUCT_QUANTITY).last().should("have.text", "149");
  });

  it("금액을 충전 후 상품 개수가 0개인 상품을 구매하려 한다면 alert을 띄운다.", () => {
    cy.get(MENU.MANAGE).click();
    cy.get(MANAGE.ADD_NAME).type("신상품");
    cy.get(MANAGE.ADD_PRICE).type(1500);
    cy.get(MANAGE.ADD_QUANTITY).type(1);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(10000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(PURCHASE.PRODUCT_BUTTON).last().click();
    cy.get(PURCHASE.PRODUCT_BUTTON).last().click();

    cy.get(PURCHASE.PRODUCT_QUANTITY).last().should("have.text", "0");
    cy.get("@alert").should("have.been.called");
  });

  it("상품 구매시 충전 잔액이 상품 가격보다 작은 경우 alert을 띄운다.", () => {
    cy.get(MENU.MANAGE).click();
    cy.get(MANAGE.ADD_NAME).type("신상품");
    cy.get(MANAGE.ADD_PRICE).type(1500);
    cy.get(MANAGE.ADD_QUANTITY).type(150);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(1000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(PURCHASE.PRODUCT_BUTTON).last().click();
    cy.get("@alert").should("have.been.called");
  });

  it("자판기가 보유한 동전 100원 5개, 500원 2개인 상태이고, 1000원을 거슬러줘야 한다면 500원 2개를 반환한다.", () => {
    cy.window().then(win => {
      const mock = cy.stub(win.WoowaUtil.Random, "pickNumberInList");
      mock.onFirstCall().returns(500).onSecondCall().returns(500);
      mock.returns(100);
    });

    cy.get(MENU.VENDING).click();
    cy.get(VENDING.CHARGE_INPUT).type(2000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(1000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(CHANGE.BUTTON).click();
    cy.get(CHANGE.COIN_500).should("have.text", "2개");
  });

  it("자판기가 보유한 동전이 100원 5개, 500원 1개인 상태이고, 500원을 거슬러줘야 한다면 500원 1개를 반환한다.", () => {
    cy.window().then(win => {
      const mock = cy.stub(win.WoowaUtil.Random, "pickNumberInList");
      mock.onFirstCall().returns(500);
      mock.returns(100);
    });

    cy.get(MENU.VENDING).click();
    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(500);
    cy.get(CHARGE.BUTTON).click();

    cy.get(CHANGE.BUTTON).click();
    cy.get(CHANGE.COIN_500).should("have.text", "1개");
  });

  it("자판기가 보유한 동전 100원 6개, 500원 1개인 상태이고, 1000원을 거슬러줘야 한다면 100원 5개 500원 1개를 반환한다.", () => {
    cy.window().then(win => {
      const mock = cy.stub(win.WoowaUtil.Random, "pickNumberInList");
      mock.onFirstCall().returns(500);
      mock.returns(100);
    });

    cy.get(MENU.VENDING).click();
    cy.get(VENDING.CHARGE_INPUT).type(1600);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(1000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(CHANGE.BUTTON).click();
    cy.get(CHANGE.COIN_500).should("have.text", "1개");
    cy.get(CHANGE.COIN_100).should("have.text", "5개");
  });

  it("자판기가 보유한 동전 500원 2개인 상태이고, 800원을 거슬러줘야 한다면 500원 1개만 반환하고, 보유금액은 300원이어야 한다.", () => {
    cy.window().then(win => {
      const mock = cy.stub(win.WoowaUtil.Random, "pickNumberInList");
      mock.returns(500);
    });

    cy.get(MENU.VENDING).click();
    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(800);
    cy.get(CHARGE.BUTTON).click();

    cy.get(CHANGE.BUTTON).click();
    cy.get(CHANGE.COIN_500).should("have.text", "1개");
    cy.get(CHARGE.SPAN).should("have.text", "300");
  });

  it("자판기가 보유한 동전 500원 2개인 상태이고, 500원을 반환한다면 자판기가 보유한 금액은 500원이고 500원의 개수는 1개여야 한다.", () => {
    cy.window().then(win => {
      const mock = cy.stub(win.WoowaUtil.Random, "pickNumberInList");
      mock.returns(500);
    });

    cy.get(MENU.VENDING).click();
    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(500);
    cy.get(CHARGE.BUTTON).click();
    cy.get(CHANGE.BUTTON).click();

    cy.get(CHARGE.SPAN).should("have.text", "0");
    cy.get(CHANGE.COIN_500).should("have.text", "1개");

    cy.get(MENU.VENDING).click();
    cy.get(VENDING.COIN_500).should("have.text", "1개");
    cy.get(VENDING.CHARGE_AMOUNT).should("have.text", "500");
  });
});
