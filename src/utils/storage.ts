export function getStorage<T>(key: string): T {
  const item = localStorage.getItem(key);
  return item && JSON.parse(item);
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
