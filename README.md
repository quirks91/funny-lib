---
1. [groupArrByKey](#grouparrbykey)
2. [addCommas](#addcommas)
3. [removeCommas](#removecommas)
4. [validateMobileNumber](#validatemobilenumber)
5. [formatMobileNumber](#formatmobilenumber)
6. [validateTelNumber](#validatetelnumber)
7. [formatTelNumber](#formattelnumber)
8. [isEmptyObject](#isemptyobject)
9. [throttle](#throttle)
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

---

### formatMobileNumber

모바일 번호에 하이픈을 추가해줍니다.

```jsx
function formatMobileNumber(mobileNumber);

formatMobileNumber('01094251234'); // 010-9421-1234 string
formatMobileNumber('010-9425-1234'); // 010-9421-1234 string
formatMobileNumber('010-921-1234');  // 010-921-1234 string

formatMobileNumber(010-9521-1234);   // throw error
formatMobileNumber('010-9#21-1234'); // throw error
formatMobileNumber('10-29421-1234'); // throw error
```

---

### validateTelNumber

전화번호가 정상적인지 검증합니다.

```jsx
function validateTelNumber(mobileNumber);

validateTelNumber('02-9421-1234'); // 0294211234 string
validateTelNumber('042-1921-1234');  // 04219211234 string

validateTelNumber(1095211234);   // throw error
validateTelNumber('010-9#21-1234'); // throw error
validateTelNumber('10-29421-1234'); // throw error
```

---

### formatTelNumber

일반 전화번호에 하이픈을 추가해줍니다.

```jsx
function formatTelNumber(mobileNumber);

formatTelNumber('0294251234'); // 02-9425-1234 string
formatTelNumber('0434251234'); // 043-425-1234 string
formatTelNumber('07041251234');  // 070-4125-1234 string

formatTelNumber(01095211234);   // throw error
formatTelNumber('042-9#21-1234'); // throw error
formatTelNumber('0104-29421-1234'); // throw error
```

---
### isEmptyObject

일반 전화번호에 하이픈을 추가해줍니다.

```jsx
function isEmptyObject(mobileNumber);

isEmptyObject({}); // true

isEmptyObject('str'); //  flase
isEmptyObject(1234);  //  flase
isEmptyObject({a:1});   // flase
isEmptyObject(new Date()); //  flase
isEmptyObject(['0104-29421-1234']); // flase
```

---
### throttle
여러번 발생하는 이벤트를 일정 시간 동안, 한번만 실행 되도록 만듭니다.

```jsx
function throttle(callback, limit);

throttle(callback, 300)
```
