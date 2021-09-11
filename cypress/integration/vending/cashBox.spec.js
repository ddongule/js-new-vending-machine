/// <reference types="cypress" />

import { MENU, VENDING } from "../../fixtures/dom";
import { clearInputs, extractValueFromSuffix, mockPickNumberInList } from "../../utils";

const extractQuantity = extractValueFromSuffix("개");

/**
 * CHECK LIST
 * 돈통의 경우 "~개" 형태로 구성되어있음
 * "~개"라는 형식보다 순수 숫자로 형식을 지정하는 것이 테스트 코드 작성 측면에서 편리함
 * 충전 금액 확인 용도의 요소를 만약에 "충전금액: 1000" 형태로 저장하는 지원자의 테스트 코드는 어떻게 처리
 */

context("돈통", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
    cy.get(MENU.VENDING).click();

    const spy = cy.spy().as("alert");
    cy.on("window:alert", spy);
  });

  it("돈통 금액 충전 input에 100원 미만의 금액을 입력한 후 충전하기 버튼을 누른 경우 alert을 띄운다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(90);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get("@alert").should("have.been.called");
  });

  it("돈통 금액 충전 input에 10의 배수가 아닌 값을 입력한 후 충전하기 버튼을 누른 경우 alert을 띄운다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(1111);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get("@alert").should("have.been.called");
  });

  it("돈통 금액 충전 input에 1000원을 입력 후 충전하기 버튼을 누른 경우 500원의 개수는 0 ~ 2개 사이여야한다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(VENDING.COIN_500)
      .invoke("text")
      .then(text => {
        expect(Number(extractQuantity(text))).to.gte(0);
      });
    cy.get(VENDING.COIN_500)
      .invoke("text")
      .then(text => {
        expect(Number(extractQuantity(text))).to.lte(2);
      });
  });

  it("돈통 금액 충전 input에 1000원을 입력 후 충전하기 버튼을 누른 경우 100원의 개수는 0 ~ 10개 사이여야한다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(VENDING.COIN_100)
      .invoke("text")
      .then(text => {
        expect(Number(extractQuantity(text))).to.gte(0);
      });
    cy.get(VENDING.COIN_100)
      .invoke("text")
      .then(text => {
        expect(Number(extractQuantity(text))).to.lte(10);
      });
  });

  it("돈통 금액 충전 input에 100원을 입력 후 충전하기 버튼을 누른 경우 50원의 개수는 0 ~ 2개 사이여야한다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(100);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(VENDING.COIN_50)
      .invoke("text")
      .then(text => {
        expect(Number(extractQuantity(text))).to.gte(0);
      });
    cy.get(VENDING.COIN_50)
      .invoke("text")
      .then(text => {
        expect(Number(extractQuantity(text))).to.lte(2);
      });
  });

  it("돈통 금액 충전 input에 100원을 입력 후 충전하기 버튼을 누른 경우 10원의 개수는 0 ~ 10개 사이여야한다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(100);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(VENDING.COIN_10)
      .invoke("text")
      .then(text => {
        expect(Number(extractQuantity(text))).to.gte(0);
      });
    cy.get(VENDING.COIN_10)
      .invoke("text")
      .then(text => {
        expect(Number(extractQuantity(text))).to.lte(10);
      });
  });

  it("돈통 금액 충전 후 다른 메뉴를 선택했다 돌아와도 보유 금액이 유지되어야 한다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(MENU.VENDING).click();

    cy.get(VENDING.CHARGE_AMOUNT).should("have.text", "1000");
  });

  it("돈통 금액 충전에 1000원, 500원을 충전하면 보유 금액이 1500원이 되어야한다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    clearInputs(VENDING.CHARGE_INPUT);
    cy.get(VENDING.CHARGE_INPUT).type(500);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(VENDING.CHARGE_AMOUNT).should("have.text", "1500");
  });
});
