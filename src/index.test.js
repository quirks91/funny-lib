const {
  addCommas,
  removeCommas,
  validateMobileNumber,
  formatMobileNumber,
  validateTelNumber,
  formatTelNumber,
  groupArrByKey,
} = require("./index");

test("adds commas to numbers", () => {
  expect(addCommas(1000)).toBe("1,000");
  expect(addCommas(1000000)).toBe("1,000,000");
  expect(addCommas(500)).toBe("500"); // No comma needed.

  // Additional test cases
  expect(() => addCommas("string")).toThrow();
  expect(addCommas(1234.5678)).toBe("1,234.5678");
  expect(addCommas(-1234)).toBe("-1,234");
  expect(() => addCommas(Infinity)).toThrow();
  expect(() => addCommas(100, 200)).toThrow();
});

test("remove commas", () => {
  expect(removeCommas("1,000.56")).toBe("1000.56");
  expect(removeCommas("1,000,000")).toBe("1000000");
  expect(removeCommas("-100,000")).toBe("-100000");
  expect(removeCommas("-100,000.56")).toBe("-100000.56");

  expect(() => removeCommas(1000)).toThrow();
  expect(() => removeCommas("1000", "300")).toThrow();
});

test("validate mobile number", () => {
  expect(validateMobileNumber("010-9425-1234")).toBe("01094251234");
  expect(validateMobileNumber("01094251234")).toBe("01094251234");
  expect(validateMobileNumber("0109251234")).toBe("0109251234");

  expect(() => validateMobileNumber(1094220525)).toThrow();
  expect(() => validateMobileNumber("010-$492-5922")).toThrow();
});

test("format mobile number", () => {
  expect(formatMobileNumber("01094251234")).toBe("010-9425-1234");
  expect(formatMobileNumber("0104251234")).toBe("010-425-1234");
  expect(formatMobileNumber("0109251234")).toBe("010-925-1234");

  expect(() => formatMobileNumber(1094220525)).toThrow();
  expect(() => formatMobileNumber("010-$492-5922")).toThrow();
  expect(() => formatMobileNumber("0104-2049-5920")).toThrow();
  expect(() => formatMobileNumber("10-25049-5920")).toThrow();
});

test("validate tel number", () => {
  expect(validateTelNumber("02-9425-1234")).toBe("0294251234");
  expect(validateTelNumber("02-133-4920")).toBe("021334920");
  expect(validateTelNumber("042-1334-4920")).toBe("04213344920");
  expect(validateTelNumber("042-334-4920")).toBe("0423344920");

  expect(() => validateTelNumber(1094220525)).toThrow();
  expect(() => validateTelNumber("010-$492-5922")).toThrow();
  expect(() => validateTelNumber("0204-2041-4921")).toThrow();
  expect(() => validateTelNumber("02-25041-4921")).toThrow();
});

test("format tel number", () => {
  expect(formatTelNumber("0294251234")).toBe("02-9425-1234");
  expect(formatTelNumber("0434251234")).toBe("043-425-1234");
  expect(formatTelNumber("07041251234")).toBe("070-4125-1234");

  expect(() => formatTelNumber(1094220525)).toThrow();
  expect(() => formatTelNumber("042-$492-5922")).toThrow();
  expect(() => formatTelNumber("0104-2049-5920")).toThrow();
});

test("group array by key", () => {
  const arr1 = [
    {
      id: "25-1",
      value: 251,
    },
    {
      id: "25-1",
      value: 305,
    },
    {
      id: "27-5",
      value: 521,
    },
  ];

  const answer = {
    "27-5": [
      {
        id: "27-5",
        value: 521,
      },
    ],
    "25-1": [
      {
        id: "25-1",
        value: 251,
      },
      {
        id: "25-1",
        value: 305,
      },
    ],
  };

  expect(groupArrByKey(arr1, "id")).toEqual(answer);
  expect(() => groupArrByKey([], "id")).toThrow("empty array");
  expect(() => groupArrByKey({}, "id")).toThrow("not array");
  expect(() => groupArrByKey(arr1, "tes")).toThrow("missing key");
});