
---
1. [groupArrByKey](#grouparrbykey)
2. [addCommas](#addcommas)
3. [removeCommas](#removecommas)
4. [validateMobileNumber](#validatemobilenumber)
5. [formatMobileNumber](#formatmobilenumber)
6. [validateTelNumber](#validatetelnumber)
7. [formatTelNumber](#formattelnumber)
---
### groupArrByKey
주어진 배열 내의 객체들을 지정된 속성 값으로 그룹화합니다.

```jsx
function groupArrByKey(arr, key);

const arr = [
  { id: "23", value: 1 },
  { id: "23", value: 4},
  { id: "20", value: 22},
];

groupArrByKey(arr, "id");
```

---
### addCommas
숫자를 받아 3자리 수 마다 콤마를 추가합니다.

```jsx
function addCommas(num);

addCommas(10000);
```

---
### removeCommas
문자열을 받아 모든 콤마를 제거합니다.

```jsx
function removeCommas(str);

addCommas('10,000');
```

---
### validateMobileNumber
모바일 번호가 아니면 에러를 내보냅니다.
하이픈이 있어도 제거한 후 검증합니다.

```jsx
function validateMobileNumber(mobileNumber);

validateMobileNumber('010-9421-1234'); // 01094211234 string
validateMobileNumber('010-921-1234');  // 0109211234 string

validateMobileNumber(010-9521-1234);   // throw error
validateMobileNumber('010-9#21-1234'); // throw error
validateMobileNumber('10-29421-1234'); // throw error
```