export enum StorageKey {
  TODO = 'todo'
}
export function getLocalStorage<T>(key: StorageKey, initial: T): T {
  return JSON.parse(localStorage.getItem(key) || `${initial}`);
}

export function saveToLocalStorage<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}
