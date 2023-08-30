export enum StorageKey {
  TODO = 'todo',
}
export function getLocalStorage(key: StorageKey) {
  return JSON.parse(localStorage.getItem(key) || `[]`);
}

export function saveToLocalStorage<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}
