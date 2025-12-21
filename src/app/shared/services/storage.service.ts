import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
    // Local storage
    getLocal(key: string): string | null {
        try { return localStorage.getItem(key); } catch { return null; }
    }
    setLocal(key: string, value: string): void {
        try { localStorage.setItem(key, value); } catch { }
    }

    // Session storage
    getSession(key: string): string | null {
        try { return sessionStorage.getItem(key); } catch { return null; }
    }
    setSession(key: string, value: string): void {
        try { sessionStorage.setItem(key, value); } catch { }
    }
    removeSession(key: string): void {
        try { sessionStorage.removeItem(key); } catch { }
    }

    // JSON helpers
    getSessionJSON<T>(key: string): T | null {
        const raw = this.getSession(key);
        if (!raw) return null;
        try { return JSON.parse(raw) as T; } catch { return null; }
    }
    setSessionJSON(key: string, value: any): void {
        try { this.setSession(key, JSON.stringify(value)); } catch { }
    }
}
