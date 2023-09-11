/********** 내부 함수 **********/
class Validate {
  constructor() {}
  isNumber(value: any) {
    if (typeof value !== "number" || isNaN(value)) {
      throw new Error("Input must be a number");
    }
    return true;
  }
  isString(value: any) {
    if (typeof value !== "string") {
      throw new Error("Input must be a string");
    }
    return true;
  }
  isArray(value: any) {
    if (!Array.isArray(value)) {
      throw new Error("not array");
    }
    return true;
  }
  isFinite(value: any) {
    if (!isFinite(value)) {
      throw new Error("Input must be a finite number");
    }
    return true;
  }
  isValidateOneArgument(value: any) {
    if (value.length !== 1) {
      throw new Error("This function accepts exactly one argument");
    }
  }
  isValidateOnlyNumber(value: any) {
    if (!/^\d+$/.test(value)) {
      throw new Error("tel number should only contain digits");
    }
  }
}
const valid = new Validate();
/********** 내부 함수 **********/

/**
 * 콤마를 추가할 넘버
 * @param num - 콤마를 추가할 넘버
 * @returns 콤마가 추가된 문자열
 */
function addCommas(num: number): string {
  valid.isValidateOneArgument(arguments);
  valid.isNumber(num);
  valid.isFinite(num);

  const parts = num.toString().split(".");

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join(".");
}

/**
 * 콤마가 제거된 문자열
 * @param str - 콤마가 포함된 문자열
 * @returns 콤마가 제거된 문자열
 */
function removeCommas(str: string): string {
  valid.isValidateOneArgument(arguments);
  valid.isString(str);

  return str.replace(/,/g, "");
}

/**
 * @notice 전화번호 유효성 검사 및 하이픈 제거
 * @param phoneNumber - 전화번호 문자열 (하이픈 포함)
 * @returns 하이픈이 제거된 숫자로만 구성된 전화번호 문자열
 */
function validateMobileNumber(phoneNumber: string): string {
  valid.isString(phoneNumber);

  const strippedNumber = phoneNumber.replace(/-/g, "");

  valid.isValidateOnlyNumber(strippedNumber);

  if (
    strippedNumber.length < 10 ||
    strippedNumber.length > 11 ||
    strippedNumber.slice(0, 3) !== "010"
  ) {
    throw new Error("Invalid phone number format");
  }

  return strippedNumber;
}

/**
 * @notice 전화번호 형식을 정규적인 형태로 변환
 * @param phoneNumber - 전화번호 문자열 (하이픈 포함)
 * @returns 정규적인 형식으로 변환된 전화번호 문자열
 */
function formatMobileNumber(phoneNumber: string): string {

  valid.isString(phoneNumber);

  // 모든 하이픈 제거
  const strippedNumber = phoneNumber.replace(/-/g, "");

  valid.isValidateOnlyNumber(strippedNumber);

  let formattedNumber;

  if (strippedNumber.length === 10 && strippedNumber.startsWith("010")) {
    // 핸드폰 번호 체크
    formattedNumber = strippedNumber.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "$1-$2-$3"
    );
  } else if (strippedNumber.length === 11 && strippedNumber.startsWith("010")) {
    // 핸드폰 번호 체크
    formattedNumber = strippedNumber.replace(
      /(\d{3})(\d{4})(\d{4})/,
      "$1-$2-$3"
    );
  } else {
    throw new Error("Invalid mobile number format");
  }

  return formattedNumber;
}

/**
 * @notice 일반전화 유효성 검사 및 하이픈 제거
 * @param tel - 일반전화 번호 (하이픈 포함)
 * @returns 하이픈이 제거된 숫자로만 구성된 일반전화 번호
 */
function validateTelNumber(tel: string): string {
  valid.isString(tel);

  // 모든 하이픈 제거
  const strippedNumber = tel.replace(/-/g, "");

  valid.isValidateOnlyNumber(strippedNumber);

  // 길이와 앞 세 자리를 기준으로 포맷 확인
  const len = strippedNumber.length;
  const prefix = strippedNumber.slice(0, 2);

  if (prefix === "02") {
    // 서울 지역 번호 체크
    if (len < 9 || len > 10) {
      throw new Error("Invalid phone number format for Seoul");
    }
  } else {
    // 그 외 지역 번호 체크
    if (len < 10 || len > 11) {
      throw new Error("Invalid phone number format for other regions");
    }
  }

  return strippedNumber;
}

/**
 * @notice 일반전화 번호 형식을 정규적인 형태로 변환
 * 02-123-4567, 031-1234-5678 등의 서울 및 그 외 지역 번호를 표준 형식으로 변환합니다.
 * 02와 010으로 시작하는 경우에 한정하여 처리합니다.
 * 다른 규칙의 일반전화 번호는 예외 처리됩니다.
 *
 * @param tel - 일반전화 번호 (하이픈 포함)
 * @returns 정규적인 형식으로 변환된 일반전화 번호
 */
function formatTelNumber(tel: string): string {
  valid.isString(tel);

  // 모든 하이픈 제거
  const strippedNumber = tel.replace(/-/g, "");

  valid.isValidateOnlyNumber(strippedNumber);

  let formattedNumber;

  if (strippedNumber.length === 9 && strippedNumber.startsWith("02")) {
    // 서울 지역 번호 체크
    formattedNumber = strippedNumber.replace(
      /(\d{2})(\d{3})(\d{4})/,
      "$1-$2-$3"
    );
  } else if (
    strippedNumber.length === 10 &&
    strippedNumber.startsWith("02")
  ) {
    // 서울 지역 번호 체크
    formattedNumber = strippedNumber.replace(
      /(\d{2})(\d{4})(\d{4})$/,
      "$1-$2-$3"
    );
  } else if (strippedNumber.length === 10) {
    // 그 외 지역 번호 체크
    formattedNumber = strippedNumber.replace(
      /(\d{3})(\d{3})(\d{4})$/,
      "$1-$2-$3"
    );
  } else if (strippedNumber.length === 11) {
    // 그 외 지역 번호 체크
    formattedNumber = strippedNumber.replace(
      /(\d{3})(\d{4})(\d{4})$/,
      "$1-$2-$3"
    );
  } else {
    throw new Error("Invalid tel number format");
  }

  return formattedNumber;
}

type ObjectType = Record<string, any>;
/**
 * 객체 배열을 아이디별로 분류하여 반환합니다.
 *
 * 주어진 객체 배열에서 특정 속성값(property)을 기준으로 객체들을 그룹핑하여 반환합니다.
 *
 *
 *@example
 *
 const arr = [
   { id: 'A', name: 'Apple' },
   { id: 'B', name: 'Banana' },
   { id: 'A', name: 'Avocado' },
   { id:'C', name:'Cherry'}
 ];
 const grouped = groupArrByKey(arr, 'id');
 console.log(grouped);
 // Output:
 {
    A:[{id:'A',name:'Apple'},{id:'A',name:'Avocado'}],
    B:[{id:'B',name:'Banana'}],
    C:[{id:'C',name:'Cherry'}]
 }
 *
 *@param objectArray 배열 데이터
 *@property property 아아디별 분류할 속성 이름입니다. 이 속성은 각 개체에 있어야 합니다.
 *@return 각 아아디별로 분류 된 객체 배열입니다. 결과는 개체의 속성 값(property)을 키(key)로 사용하여 맵(Map)처럼 구현됩니다.  
 */
function groupArrByKey<T extends ObjectType, K extends keyof T>(
  objectArray: T[],
  property: K
): Record<T[K], T[]> {
  
  valid.isArray(objectArray);

  if (objectArray.length === 0) {
    throw new Error("empty array");
  }

  return objectArray.reduce(function (acc: Record<T[K], T[]>, obj: T) {
    if (!obj.hasOwnProperty(property)) {
      throw new Error("missing key");
    }

    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {} as Record<T[K], T[]>);
}

/**
 * @notice 비어있는지 여부 확인, 객체가 비어있다면 true를 반환하고, 그렇지 않으면 false를 반환합니다.
 * @example isEmptyObject({});           // Output : true
 * isEmptyObject({ a :1 });     // Output : false
 * isEmptyObject(new Date());   // Output : false
 * isEmptyObject([]);           // Output : false
 *@param obj 확인할 객체입니다.
 *@return 주어진 객체가 비어있다면 true, 그렇지 않으면 false입니다.
 */
function isEmptyObject(obj: any): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

// throttle.ts
function throttle<T extends any[]>(
  func: (...params: T) => void,
  timeout: number
) {
  valid.isNumber(timeout);

  let wait = false;
  return (...args: any) => {
    if (wait) {
      return;
    }
    setTimeout(() => {
      wait = false;
    }, timeout);
    wait = true;
    func(...args);
  };
}

export {
  addCommas,
  removeCommas,
  validateMobileNumber,
  formatMobileNumber,
  validateTelNumber,
  formatTelNumber,
  groupArrByKey,
  isEmptyObject,
  throttle,
};
