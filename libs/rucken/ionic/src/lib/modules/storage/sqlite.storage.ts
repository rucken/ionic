import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IStorage } from '@rucken/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class SqliteStorage implements IStorage {
  [index: number]: string;
  [key: string]: any;
  length: number;
  constructor(
    private _platform: Platform,
    private _storageService: Storage,
    private _cookieService: CookieService
  ) { }
  private isMobile() {
    return this.platform.is('mobile');
  }
  public clear(): Promise<any> {
    if (this.isMobile()) {
      return new Promise(resolve => {
        this._storageService.ready().then(() =>
          this._storageService.clear().then(() =>
            resolve(true)
          )
        );
      });
    } else {
      return new Promise(resolve => {
        this._cookieService.deleteAll();
        resolve(true);
      });
    }
  }
  public getItem(key: string): Promise<string> {
    if (this.isMobile()) {
      return new Promise(resolve => {
        this._storageService.ready().then(() =>
          this._storageService.get(key).then(value =>
            resolve(value)
          )
        );
      });
    } else {
      let data: string;
      try {
        data = JSON.parse(this._cookieService.get(key));
      } catch (error) {
        data = this._cookieService.get(key);
      }
      return new Promise(resolve => {
        resolve(data);
      });
    }
  }
  public key(index: number): Promise<string> {
    if (this.isMobile()) {
      return new Promise(resolve => {
        this._storageService.ready().then(() =>
          this._storageService.keys().then(keys =>
            resolve(keys[index])
          )
        );
      });
    } else {
      return new Promise(resolve => {
        const data = this._cookieService.getAll().propertyIsEnumerable[index];
        resolve(data);
      });
    }
  }
  public removeItem(key: string): Promise<any> {
    if (this.isMobile()) {
      return new Promise(resolve => {
        this._storageService.ready().then(() =>
          this._storageService.remove(key).then(() =>
            resolve(true)
          )
        );
      });
    } else {
      return new Promise(resolve => {
        this._cookieService.delete(key, '/');
        resolve(true);
      });
    }
  }
  public setItem(key: string, data: any): Promise<any> {
    if (this.isMobile()) {
      return new Promise(resolve => {
        this._storageService.ready().then(() =>
          this._storageService.set(key, data).then(() =>
            resolve(true)
          )
        );
      });
    } else {
      return new Promise(resolve => {
        try {
          this._cookieService.set(key, JSON.stringify(data), undefined, '/');
        } catch (error) {
          this._cookieService.set(key, data, undefined, '/');
        }
        resolve(true);
      });
    }
  }
}
