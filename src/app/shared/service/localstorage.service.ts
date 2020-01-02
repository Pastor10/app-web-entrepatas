import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';


export interface LocalStorageEvent {
  event: string;
  key: string;
  value: any;
}

@Injectable()
export class LocalStorageService {
  _eventBus: BehaviorSubject<LocalStorageEvent> = new BehaviorSubject<LocalStorageEvent>(null);
  localStorageEventEmiter = this._eventBus.asObservable();

  constructor(public router: Router) {
  }

  public set(key: string, value) {
    this._eventBus.next({
      event: 'change',
      key: key,
      value: value
    });

    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any {
    const str = localStorage.getItem(key);
    return str ? JSON.parse(str) : null;
  }

  public getSingle(key: string): any {
    const str = localStorage.getItem(key);
    return str;
  }

  public removeItem(key: string): any {
    const str = localStorage.removeItem(key);
  }

  public clearStorage(): any {
    const str = localStorage.clear();
  }

}
