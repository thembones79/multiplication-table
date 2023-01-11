export const getStorage = (key: string) =>
  JSON.parse(localStorage.getItem(key) || "");

export const setStorage = (key: string, value: Object) =>
  localStorage.setItem(key, JSON.stringify(value));
