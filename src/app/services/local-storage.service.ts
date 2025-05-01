import { Injectable } from '@angular/core';
import { StorageService } from './storage-service.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements StorageService {
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, data: string): void {
    return localStorage.setItem(key, data);
  }

  clear(key: string): void {
    return localStorage.removeItem(key);
  }

}