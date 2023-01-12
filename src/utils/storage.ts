export function getStorage<T>(key: string): T {
  return JSON.parse(localStorage.getItem(key) || "");
}

export function setStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function create<T>(key: string) {
  return {
    get: () => getStorage<T>(key),
    set: (value: T) => setStorage<T>(key, value),
  };
}
