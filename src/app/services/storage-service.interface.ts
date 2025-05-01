
export interface StorageService {
  clear(key: string): void;

  getItem(key: string): string | null;

  setItem(key: string, data: string): void;

}
