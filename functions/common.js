const { asterisks } = require("../enums/dict");
//heicConvert required to be installed somewhere
const heicConvert = require("heic-convert/browser");

exports.objHasChild = function (obj) {
  return !!Object.keys(obj).length;
};

exports.getNameFromEmail = function (email) {
  const name = email.split("@")[0];
  return name;
};

exports.formatJSONToString = function (obj) {
  let str = "";
  for (const key in obj) {
    str = str + `${key} - ${obj[key]}, `;
  }
  str = str.slice(0, -2);
  return str;
};

exports.addToCount = function (obj, key, value) {
  if (!obj[key]) {
    obj[key] = value;
  } else {
    obj[key] += value;
  }
};

exports.mod = function (a, n, zeroBased = true) {
  const remainder = ((a % n) + n) % n; // a number from 0 to n-1
  return zeroBased ? remainder : remainder || n; // a number from 1 to n
};

exports.setLocalStorage = function (key, val) {
  let item;
  if (typeof val === "object") {
    item = JSON.stringify(val);
  } else {
    item = val.toString();
  }
  localStorage.setItem(key, item);
};

exports.getLocalStorage = function (key, type) {
  const item = localStorage.getItem(key);
  if (!item) {
    // item === null or item === ''
    return item;
  } else if (type === "object") {
    return JSON.parse(item);
  } else if (type === "number") {
    return parseInt(item);
  } else if (type === "boolean") {
    return !(item === "false");
  } else {
    return item;
  }
};

exports.nextMultipleOfXAboveY = function (x, y) {
  return Math.ceil(y / x) * x;
};

exports.checkCodesEqual = function (inputCode, checkCode) {
  return inputCode === checkCode || inputCode === asterisks;
};

exports.heicToJpeg = async function (res) {
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const arrayBuffer = await res.arrayBuffer();

  // Convert ArrayBuffer to Uint8Array for heicConvert
  const uint8Array = new Uint8Array(arrayBuffer);
  const heic = await heicConvert({
    buffer: uint8Array,
    format: "JPEG",
    quality: 0.5,
  });

  // Create a Blob from the Uint8Array data
  const convertedBlob = new Blob([heic], { type: "image/jpeg" });

  // URL to display
  return URL.createObjectURL(convertedBlob);
};
