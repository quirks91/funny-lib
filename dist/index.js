"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyObject = exports.groupArrByKey = exports.formatTelNumber = exports.validateTelNumber = exports.formatMobileNumber = exports.validateMobileNumber = exports.removeCommas = exports.addCommas = void 0;
/**
 * 콤마를 추가할 넘버
 * @param num - 콤마를 추가할 넘버
 * @returns 콤마가 추가된 문자열
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
exports.addCommas = addCommas;
/**
 * 콤마가 제거된 문자열
 * @param str - 콤마가 포함된 문자열
 * @returns 콤마가 제거된 문자열
 */
function removeCommas(str) {
    if (arguments.length !== 1) {
        throw new Error("This function accepts exactly one argument");
    }
    if (typeof str !== "string") {
        throw new Error("Input must be a string");
    }
    return str.replace(/,/g, "");
}
exports.removeCommas = removeCommas;
/**
 * 전화번호 유효성 검사 및 하이픈 제거
 * @param phoneNumber - 전화번호 문자열 (하이픈 포함)
 * @returns 하이픈이 제거된 숫자로만 구성된 전화번호 문자열
 */
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
    if (strippedNumber.length < 10 ||
        strippedNumber.length > 11 ||
        strippedNumber.slice(0, 3) !== "010") {
        throw new Error("Invalid phone number format");
    }
    return strippedNumber;
}
exports.validateMobileNumber = validateMobileNumber;
/**
 * 전화번호 형식을 정규적인 형태로 변환
 * @param phoneNumber - 전화번호 문자열 (하이픈 포함)
 * @returns 정규적인 형식으로 변환된 전화번호 문자열
 */
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
        formattedNumber = strippedNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }
    else if (strippedNumber.length === 11 && strippedNumber.startsWith("010")) {
        // 핸드폰 번호 체크
        formattedNumber = strippedNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    }
    else {
        throw new Error("Invalid mobile number format");
    }
    return formattedNumber;
}
exports.formatMobileNumber = formatMobileNumber;
/**
 * 일반전화 유효성 검사 및 하이픈 제거
 * @param tel - 일반전화 번호 (하이픈 포함)
 * @returns 하이픈이 제거된 숫자로만 구성된 일반전화 번호
 */
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
    }
    else {
        // 그 외 지역 번호 체크
        if (len < 10 || len > 11) {
            throw new Error("Invalid phone number format for other regions");
        }
    }
    return strippedNumber;
}
exports.validateTelNumber = validateTelNumber;
/**
 * 일반전화 번호 형식을 정규적인 형태로 변환
 * 02-123-4567, 031-1234-5678 등의 서울 및 그 외 지역 번호를 표준 형식으로 변환합니다.
 * 02와 010으로 시작하는 경우에 한정하여 처리합니다.
 * 다른 규칙의 일반전화 번호는 예외 처리됩니다.
 *
 * @param tel - 일반전화 번호 (하이픈 포함)
 * @returns 정규적인 형식으로 변환된 일반전화 번호
 */
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
        formatted_number = stripped_number.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
    }
    else if (stripped_number.length === 10 &&
        stripped_number.startsWith("02")) {
        // 서울 지역 번호 체크
        formatted_number = stripped_number.replace(/(\d{2})(\d{4})(\d{4})$/, "$1-$2-$3");
    }
    else if (stripped_number.length === 10) {
        // 그 외 지역 번호 체크
        formatted_number = stripped_number.replace(/(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3");
    }
    else if (stripped_number.length === 11) {
        // 그 외 지역 번호 체크
        formatted_number = stripped_number.replace(/(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3");
    }
    else {
        throw new Error("Invalid tel number format");
    }
    return formatted_number;
}
exports.formatTelNumber = formatTelNumber;
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
exports.groupArrByKey = groupArrByKey;
/**
* @notice 비어있는지 여부 확인, 객체가 비어있다면 true를 반환하고, 그렇지 않으면 false를 반환합니다.
*
* @example console.log(isEmptyObject({})); // Output : true
* console.log(isEmptyObject({ a :1 })); // Output : false
* console.log(isEmptyObject(new Date())); // Output : false
* console.log(isEmptyObject([])); // Output : false
*@param obj 확인할 객체입니다.
*@return 주어진 객체가 비어있다면 true, 그렇지 않으면 false입니다.
*/
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
exports.isEmptyObject = isEmptyObject;
