/**
 * @param {number} num - 콤마를 추가할 넘버
 * @returns {string} - 콤마가 추가된 문자열
 */
function addCommas(num) {
  if (arguments.length !== 1) {
    throw new Error("This function accepts exactly one argument");
  }

  if (typeof num !== "number" || isNaN(num)) {
    throw new Error("Input must be a number");
  }

  if (!isFinite(num)) {
    throw new Error("Input must be a finite number");
  }

  const parts = num.toString().split(".");

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join(".");
}

function removeCommas(str) {
  if (arguments.length !== 1) {
    throw new Error("This function accepts exactly one argument");
  }

  if (typeof str !== "string") {
    throw new Error("Input must be a string");
  }

  return str.replace(/,/g, "");
}

function validateMobileNumber(phoneNumber) {
  // 입력값이 문자열인지 확인
  if (typeof phoneNumber !== "string") {
    throw new Error("Input must be a string");
  }

  // 모든 하이픈 제거
  const strippedNumber = phoneNumber.replace(/-/g, "");

  // 숫자만 포함되어 있는지 확인
  if (!/^\d+$/.test(strippedNumber)) {
    throw new Error("Phone number should only contain digits");
  }

  // 길이가 맞는지 확인 (010 + 중간자리(3~4자리) + 끝자리(4자리))
  if (
    strippedNumber.length < 10 ||
    strippedNumber.length > 11 ||
    strippedNumber.slice(0, 3) !== "010"
  ) {
    throw new Error("Invalid phone number format");
  }

  return strippedNumber;
}

function formatMobileNumber(phoneNumber) {
  if (typeof phoneNumber !== "string") {
    throw new Error("Input must be a string");
  }

  // 모든 하이픈 제거
  const strippedNumber = phoneNumber.replace(/-/g, "");

  if (!/^\d+$/.test(strippedNumber)) {
    throw new Error("Phone number should only contain digits");
  }

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

function validateTelNumber(tel) {
  // 입력값이 문자열인지 확인
  if (typeof tel !== "string") {
    throw new Error("Input must be a string");
  }

  // 모든 하이픈 제거
  const strippedNumber = tel.replace(/-/g, "");

  // 숫자만 포함되어 있는지 확인
  if (!/^\d+$/.test(strippedNumber)) {
    throw new Error("Phone number should only contain digits");
  }

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

function formatTelNumber(tel) {
  if (typeof tel !== "string") {
    throw new Error("Input must be a string");
  }
  // 모든 하이픈 제거
  const stripped_number = tel.replace(/-/g, "");

  if (!/^\d+$/.test(stripped_number)) {
    throw new Error("tel number should only contain digits");
  }

  let formatted_number;

  if (stripped_number.length === 9 && stripped_number.startsWith("02")) {
    // 서울 지역 번호 체크
    formatted_number = stripped_number.replace(
      /(\d{2})(\d{3})(\d{4})/,
      "$1-$2-$3"
    );
  } else if (
    stripped_number.length === 10 &&
    stripped_number.startsWith("02")
  ) {
    // 서울 지역 번호 체크
    formatted_number = stripped_number.replace(
      /(\d{2})(\d{4})(\d{4})$/,
      "$1-$2-$3"
    );
  } else if (stripped_number.length === 10) {
    // 그 외 지역 번호 체크
    formatted_number = stripped_number.replace(
      /(\d{3})(\d{3})(\d{4})$/,
      "$1-$2-$3"
    );
  } else if (stripped_number.length === 11) {
    // 그 외 지역 번호 체크
    formatted_number = stripped_number.replace(
      /(\d{3})(\d{4})(\d{4})$/,
      "$1-$2-$3"
    );
  } else {
    throw new Error("Invalid tel number format");
  }

  return formatted_number;
}

/**
 * 아이디별 분류
 * @param {*} objectArray - 배열 데이터
 * @param {string} property - 아이디별 분류
 * @returns {id:[], id: []}
 */
function groupArrByKey(objectArray, property) {
  if (!Array.isArray(objectArray)) {
    throw new Error("not array");
  }

  if (objectArray.length === 0) {
    throw new Error("empty array");
  }

  return objectArray.reduce(function (acc, obj) {
    if (!obj.hasOwnProperty(property)) {
      throw new Error("missing key");
    }

    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

/********** 내부 함수 **********/

module.exports = {
  addCommas,
  removeCommas,
  validateMobileNumber,
  formatMobileNumber,
  validateTelNumber,
  formatTelNumber,
  groupArrByKey,
};
