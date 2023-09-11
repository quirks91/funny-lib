/**
 * 콤마를 추가할 넘버
 * @param num - 콤마를 추가할 넘버
 * @returns 콤마가 추가된 문자열
 */
declare function addCommas(num: number): string;

/**
 * 콤마가 제거된 문자열
 * @param str - 콤마가 포함된 문자열
 * @returns 콤마가 제거된 문자열
 */
declare function removeCommas(str: string): string;

/**
 * 전화번호 유효성 검사 및 하이픈 제거
 * @param phoneNumber - 전화번호 문자열 (하이픈 포함)
 * @returns 하이픈이 제거된 숫자로만 구성된 전화번호 문자열
 */
declare function validateMobileNumber(phoneNumber: string): string;

/**
 * 전화번호 형식을 정규적인 형태로 변환
 * @param phoneNumber - 전화번호 문자열 (하이픈 포함)
 * @returns 정규적인 형식으로 변환된 전화번호 문자열
 */
declare function formatMobileNumber(phoneNumber: string): string;

/**
 * 일반전화 유효성 검사 및 하이픈 제거
 * @param tel - 일반전화 번호 (하이픈 포함)
 * @returns 하이픈이 제거된 숫자로만 구성된 일반전화 번호
 */
declare function validateTelNumber(tel: string): string;

/**
 * 일반전화 번호 형식을 정규적인 형태로 변환
 * 02-123-4567, 031-1234-5678 등의 서울 및 그 외 지역 번호를 표준 형식으로 변환합니다.
 * 02와 010으로 시작하는 경우에 한정하여 처리합니다.
 * 다른 규칙의 일반전화 번호는 예외 처리됩니다.
 *
 * @param tel - 일반전화 번호 (하이픈 포함)
 * @returns 정규적인 형식으로 변환된 일반전화 번호
 */
declare function formatTelNumber(tel: string): string;

/**
 * 객체 배열을 아이디별로 분류하여 반환합니다.
 *
 * 주어진 객체 배열에서 특정 속성값(property)을 기준으로 객체들을 그룹핑하여 반환합니다.
 *
 *
 *@example 예시:
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
declare function groupArrByKey<
  T extends Record<string, any>,
  K extends keyof T
>(objectArray: T[], property: K): Record<T[K], T[]>;

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
declare function isEmptyObject(obj: any): boolean;

export {
  addCommas,
  removeCommas,
  validateMobileNumber,
  formatMobileNumber,
  validateTelNumber,
  formatTelNumber,
  groupArrByKey,
  isEmptyObject,
};
