### **공통**

- 상단에 `탭`메뉴가 존재하며 각 탭에 따라 적절한 기능을 수행한다.
  - `상품 구매`탭은 사용자가 **금액을 충전**할 수 있으며, 금액에 맞춰 **상품을 구매**하고, 남은 금액에 대해서는 **잔돈을 반환**하는 기능을 수행한다.
  - `잔돈 충전`탭은 **자판기가 보유할 금액을 충전**하는 기능을 수행한다.
  - `상품 관리`탭은 자판기가 보유하고 있는 **물품을 추가**하는 기능을 수행한다.

### **잔돈 계산 모듈**

- `상품 구매` 탭에서, 잔돈 반환 시 다음과 같은 규칙을 통해 잔돈을 반환한다.
- [x] 최소 개수의 동전으로 잔돈을 돌려준다.
  - 예) 1000원 넣고 650원짜리 음료를 선택했다면, 잔돈은 100, 100, 100, 50원으로 반환한다.
- 지폐를 잔돈으로 반환하는 경우는 없다고 가정한다.
- [x] 모든 금액에 대해 잔돈을 반환할 수 없는 경우 잔돈으로 반환할 수 있는 금액만 반환한다.
  - 예) 동전이 500,100,50,10원이 각각 1개씩 있는데 654원을 반환해야하는 경우 50원(1개), 100원(1개), 50원(1개) 총 3개를 반환하고, 4원은 반환하지 않는다.
- [x] 동전의 개수를 나타내는 정보는 `{개수}개` 형식으로 나타낸다.
  - 예) 1개 (o) / 1 개 (x) / 1 (x)

### **돈통**

- `잔돈 충전` 탭에서, 다음과 같은 규칙으로 자판기 보유 금액을 충전한다.
- [x] 관리자는 자판기가 보유한 금액을 충전할 수 있다.
  - 최소 충전 금액은 100원이며, 10원으로 나누어 떨어지는 금액만 충전이 가능하다.
- [x] 충전 버튼을 누르면 자판기가 보유한 금액이 보여지며, 자판기가 보유한 금액 만큼의 동전이 무작위로 생성된다.
  - 동전은 500원, 100원, 50원, 10원의 동전만 생성된다.
- [x] 동전의 개수를 나타내는 정보는 `{개수}개` 형식으로 나타낸다.
  - 예) 1개 (o) / 1 개 (x) / 1 (x)
- [x] 다른 탭을 클릭하여도 자판기가 보유한 금액은 유지되어야 한다.

### **상품 구매**

- `상품 구매`탭에서, 다음과 같은 규칙을 바탕으로 금액을 충전하고, 상품을 구매하며, 잔돈을 반환한다.
- [x] 사용자는 상품 구매를 위해 금액을 충전할 수 있다.
  - 금액은 10원으로 나누어 떨어지는 금액만 충전이 가능하다.
- [x] 금액은 누적으로 충전이 가능하다.
  - 1,000원 충전 -> 500원 충전 => 1,500원
- [x] 사용자는 충전한 금액을 바탕으로 상품을 구매할 수 있다.
- [x] 상품 구매에 성공하면, 충전한 금액이 상품 금액만큼 차감 된다. 또한 상품의 수량도 차감된다.
  - 수량이 0인 상품은 구매할 수 없다.
- [x] 모든 상품 구매가 완료되면, 사용자는 반환하기 버튼을 통해 잔돈을 반환 받을 수 있다.
- [x] 잔돈은 자판기가 보유한 동전을 바탕으로 최소 개수로 반환한다.
  - 잔돈 반환 규칙은 `잔돈 계산 모듈` 요구사항의 규칙을 따른다.

### **상품 추가**

- `상품 관리`탭에서, 다음과 같은 규칙을 바탕으로 상품을 관리한다.
- [x] 상품명, 수량, 금액을 추가할 수 있다.
  - 상품 추가 입력 폼에 상품명, 가격, 수량을 차례로 입력한다.
  - 상품명, 가격, 수량은 공백이 불가능하다.
  - 상품의 최소 수량은 1개여야 한다.
  - 상품의 최소 가격은 100원이며, 10원으로 나누어 떨어져야 한다.
    - 예) 콜라 / 110원 / 5개
    - 예) 사이다 / 100원 / 100개
- [x] 같은 상품명의 데이터를 추가하면 기존의 상품에 해당하는 데이터는 새로운 상품으로 대체된다.
  - 콜라 / 1000원 / 12개(전) -> 콜라 / 1500원 / 10개(후) => 콜라 / 1500원 / 10개(결과)
- [x] 사용자는 추가한 상품을 확인할 수 있다.
  - 상품의 이름, 가격, 수량 순으로 상품 목록이 보여진다.
- [x] 상품 목록은 탭을 이동하여도 기존의 상태가 유지되어야 한다.

## **프로그래밍 요구 사항**

### **DOM 선택자**

**메뉴**

- `금액 충전` 및 `상품 구매`, `잔돈 반환`을 하기 위한 메뉴 id는 `product-purchase-menu`이다.
- 자판기에 `잔돈 충전`을 위한 메뉴 id는 `vending-machine-manage-menu`이다.
- 자판기에 `상품 추가`를 위한 메뉴 id는 `product-manage-menu`이다.

**상품 구매 및 금액 충전 메뉴**

- 금액 충전 입력 요소의 id는 `charge-input`이다.
- 충전 버튼 요소의 id는 `charge-button`이다.
- 충전된 금액을 확인하는 요소의 id는 `charge-amount`이다.
- 반환하기 버튼 요소의 id는 `coin-return-button`이다.
- 반환된 동전의 개수는 테이블 형태이다.
  - 각 동전의 개수에 해당하는 요소의 id는 다음과 같다.
  - 500원: `coin-500-quantity`
  - 100원: `coin-100-quantity`
  - 50원: `coin-50-quantity`
  - 10원: `coin-10-quantity`
- 각 상품의 구매 버튼에 해당하는 요소의 class명은 `purchase-button`이다.
- 각 상품 목록의 이름에 해당하는 요소의 class명은 `product-purchase-name`이다.
- 각 상품 목록의 가격에 해당하는 요소의 class명은 `product-purchase-price`이다.
- 각 상품 목록의 수량에 해당하는 요소의 class명은 `product-purchase-quantity`이다.
- 각 상품 목록의 이름은 `dataset` 속성을 사용하고 `data-product-name` 형식으로 저장한다.
- 각 상품 목록의 가격은 `dataset` 속성을 사용하고 `data-product-price` 형식으로 저장한다.
- 각 상품 목록의 수량은 `dataset` 속성을 사용하고 `data-product-quantity` 형식으로 저장한다.

**자판기 잔돈(보유 금액) 충전 메뉴**

- 동전을 무작위로 생성하는 기능은 `/lib/` 내부의 랜덤 유틸 중 `Random.pick` 메서드를 활용해서 구현한다.
- 자판기가 보유할 금액을 충전할 요소의 id는 `vending-machine-charge-input`이다.
- `충전하기` 버튼에 해당하는 요소의 id는 `vending-machine-charge-button`이다.
- 충전된 금액을 확인하는 요소의 id는 `vending-machine-charge-amount` 이다.
- 보유한 동전의 개수는 테이블 형태이다.
  - 각 동전의 개수에 해당하는 요소의 id는 다음과 같다.
  - 500원: `vending-machine-coin-500-quantity`
  - 100원: `vending-machine-coin-100-quantity`
  - 50원: `vending-machine-coin-50-quantity`
  - 10원: `vending-machine-coin-10-quantity`

**상품 추가 메뉴**

- 상품 추가 입력 폼의 상품명 입력 요소의 id는 `product-name-input`이다.
- 상품 추가 입력 폼의 상품 가격 입력 요소의 id는 `product-price-input`이다.
- 상품 추가 입력 폼의 수량 입력 요소의 id는 `product-quantity-input`이다.
- 상품 추가를 위한 추가 버튼 요소의 id는 `product-add-button`이다.
- 추가한 상품 목록의 이름에 해당하는 요소의 class명은 `product-manage-name`이다.
- 추가한 상품 목록의 가격에 해당하는 요소의 class명은 `product-manage-price`이다.
- 추가한 상품 목록의 수량에 해당하는 요소의 class명은 `product-manage-quantity`이다.

### **기타**

- 모든 예외 발생 상황은 alert을 이용하여 처리한다.

## 결과물

### 실행 환경

- `http-server`로 로컬 서버 띄워서 확인
  - `brew install http-server && http-server ./`
- 테스트는 채점이 아니라 개발 시 확인을 위한 용도로 jest 사용
  - `yarn test` / `yarn test:watch`

### `자판기 잔돈(보유 금액) 충전 메뉴`

<img alt="스크린샷 2021-09-06 오전 11 21 19" src="https://user-images.githubusercontent.com/26598561/144754596-57219248-32d9-44d5-b266-b04853966a1e.png">

```html
<h3>자판기 돈통 충전하기</h3>
<div class="vending-machine-wrapper">
  <input
    type="number"
    name="vending-machine-charge-amount"
    id="vending-machine-charge-input"
    autofocus
  />
  <button id="vending-machine-charge-button">충전하기</button>
</div>
<p>보유 금액: <span id="vending-machine-charge-amount">0</span>원</p>
<h3>동전 보유 현황</h3>
<table class="cashbox-remaining">
  <colgroup>
    <col />
    <col />
  </colgroup>
  <thead>
    <tr>
      <th>동전</th>
      <th>개수</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>500원</td>
      <td id="vending-machine-coin-500-quantity"></td>
    </tr>
    <tr>
      <td>100원</td>
      <td id="vending-machine-coin-100-quantity"></td>
    </tr>
    <tr>
      <td>50원</td>
      <td id="vending-machine-coin-50-quantity"></td>
    </tr>
    <tr>
      <td>10원</td>
      <td id="vending-machine-coin-10-quantity"></td>
    </tr>
  </tbody>
</table>
```

### `상품 추가 메뉴`

<img alt="스크린샷 2021-09-06 오전 11 21 32" src="https://user-images.githubusercontent.com/26598561/144754627-d698d000-a15d-48c8-acc6-ab5181639b56.png">

```html
<h3>상품 추가하기</h3>
<div class="product-container">
  <input type="text" id="product-name-input" placeholder="상품명" />
  <input type="number" id="product-price-input" placeholder="가격" />
  <input type="number" id="product-quantity-input" placeholder="수량" />
  <button id="product-add-button">추가하기</button>
</div>
<table class="product-inventory">
  <colgroup>
    <col style="width: 140px" />
    <col style="width: 100px" />
    <col style="width: 100px" />
  </colgroup>
  <thead>
    <tr>
      <th>상품명</th>
      <th>가격</th>
      <th>수량</th>
    </tr>
  </thead>
  <tbody id="product-inventory-container"></tbody>
</table>
```

### `상품 구매 및 금액 충전 메뉴`

#### `금액 충전`

<img alt="스크린샷 2021-09-06 오전 11 22 43" src="https://user-images.githubusercontent.com/26598561/144754665-1e510dcb-7299-45fb-8353-999a2dae6e9c.png">

```html
<div class="purchase-container">
  <h3>충전하기</h3>
  <div class="vending-machine-wrapper">
    <input type="number" name="charge-amount" id="charge-input" />
    <button id="charge-button">충전하기</button>
  </div>
  <p>충전 금액: <span id="charge-amount">0</span>원</p>
</div>
```

#### `잔돈 반환`

<img alt="스크린샷 2021-09-06 오전 11 22 59" src="https://user-images.githubusercontent.com/26598561/144754672-8a2b6ecb-89bd-43a2-bcb7-c46cc6914d42.png">

```html
<h3>잔돈</h3>
<button id="coin-return-button">반환하기</button>
<table class="cashbox-change">
  <colgroup>
    <col />
    <col />
  </colgroup>
  <thead>
    <tr>
      <th>동전</th>
      <th>개수</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>500원</td>
      <td id="coin-500-quantity"></td>
    </tr>
    <tr>
      <td>100원</td>
      <td id="coin-100-quantity"></td>
    </tr>
    <tr>
      <td>50원</td>
      <td id="coin-50-quantity"></td>
    </tr>
    <tr>
      <td>10원</td>
      <td id="coin-10-quantity"></td>
    </tr>
  </tbody>
</table>
```
