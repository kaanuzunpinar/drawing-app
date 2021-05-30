import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {
  type$!: Observable<any>;
  urls$!: Observable<string>;
  private subjects = new Subject<any>();
  private urls=new Subject<string>();
  constructor() { 
    this.type$=this.subjects.asObservable();
    this.urls$=this.urls.asObservable();
  }
  changeType(type:any){//service for buttons color/thickness.
    this.subjects.next(type);
  }
  sendUrl(url:string){
    this.urls.next(url);
  }
}
