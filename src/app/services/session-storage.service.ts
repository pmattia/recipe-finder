import { Injectable } from '@angular/core';
import { StorageService } from './storage-service.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService implements StorageService {
  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  setItem(key: string, data: string): void {
    return sessionStorage.setItem(key, data);
  }

  clear(key: string): void {
    return sessionStorage.removeItem(key);
  }
}