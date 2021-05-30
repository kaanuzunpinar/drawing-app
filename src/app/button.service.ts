import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {
  type$!: Observable<any>;
  private subjects = new Subject<any>();
  constructor() { 
    this.type$=this.subjects.asObservable();
  }
  changeType(type:any){
    this.subjects.next(type);
  }
}
