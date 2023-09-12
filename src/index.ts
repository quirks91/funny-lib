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
 * @param num - 콤마를 추가할 넘버
 * @returns 콤마가 추가된 문자열
 * @example
 * addCommas(1000)    -> "1,000"
 * addCommas(1000000) -> "1,000,000"
 * addCommas(500)     -> "500"
 * addCommas(-1500)   -> "-1,500"
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
 * @param str - 콤마가 포함된 문자열
 * @returns 콤마가 제거된 문자열
 * @example
 * removeCommas("1,000.56")      -> "1000.56"
 * removeCommas("1,000,000")     -> "1000000"
 * removeCommas("-1,000,000.56") -> "-1000000.56"
 */
function removeCommas(str: string): string {
  valid.isValidateOneArgument(arguments);
  valid.isString(str);

  return str.replace(/,/g, "");
}

/**
 * @param str - 하이픈이 포함된 문자열
 * @returns 하이픈이 제거된 문자열
 * @example
 * removeHyphen("1-392-492-1902") -> "13924921902"
 * removeHyphen("1-000-000")      -> "1000000"
 * removeHyphen("-1-00-00")      -> "10000"
 */
function removeHyphen(str: string): string {
  valid.isValidateOneArgument(arguments);
  valid.isString(str);

  return str.replace(/[^0-9]/g, '');
}

/**
 * @param phoneNumber - 전화번호 문자열 (하이픈 포함)
 * @returns 하이픈이 제거된 숫자로만 구성된 전화번호 문자열
 * @example
 * validateMobileNumber("010-9425-1234") -> 01094251234
 * validateMobileNumber("01094251234")   -> 01094251234
 * validateMobileNumber("0104251234")    -> 0104251234
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
 * @param phoneNumber - 전화번호 문자열 (하이픈 포함)
 * @returns 정규적인 형식으로 변환된 전화번호 문자열
 * @example
 * formatMobileNumber("01094251234")   -> "010-9425-1234"
 * formatMobileNumber("010-9425-1424") -> "010-9425-1424"
 * formatMobileNumber("0104251234")    -> "010-425-1234"
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
 * @param tel - 일반전화 번호 (하이픈 포함)
 * @returns 하이픈이 제거된 숫자로만 구성된 일반전화 번호
 * @example
 * validateTelNumber("02-9425-1234")  -> "0294251234"
 * validateTelNumber("02-133-4920")   -> "021334920"
 * validateTelNumber("042-9425-1234") -> "04294251234"
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
 * @example
 * formatTelNumber("0294251234")  -> "02-9425-1234"
 * formatTelNumber("0434251234")  -> "043-425-1234"
 * formatTelNumber("07041251234") -> "070-4125-1234"
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
 *@param objectArray 배열 데이터
 *@property property 아아디별 분류할 속성 이름입니다. 이 속성은 각 개체에 있어야 합니다.
 *@return 각 아아디별로 분류 된 객체 배열입니다. 결과는 개체의 속성 값(property)을 키(key)로 사용하여 맵(Map)처럼 구현됩니다.  
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
* @param obj 확인할 객체입니다.
* @return 주어진 객체가 비어있다면 true, 그렇지 않으면 false입니다.
* @example 
* isEmptyObject({});         -> true
* isEmptyObject({ a :1 });   -> false
* isEmptyObject(new Date()); -> false
* isEmptyObject([]);         -> false
 */
function isEmptyObject(obj: any): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * @param func callback 함수입니다.
 * @param timeout ms 으로 시간을 입력합니다.
 * @returns 여러번 실행되어도 일정 시간 동안 한번만 callback 함수가 실행됩니다.
 * @example
 * throttle(callback, 300)
 * 
 * throttle(callback, 'string') -> throw Error
 * throttle(callback, []]) -> throw Error
 */
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
  removeHyphen,
  validateMobileNumber,
  formatMobileNumber,
  validateTelNumber,
  formatTelNumber,
  groupArrByKey,
  isEmptyObject,
  throttle,
};
