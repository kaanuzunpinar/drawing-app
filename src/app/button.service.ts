import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {
  type$!: Observable<any>;
  urls$!: Observable<string>;
  shapes$!: Observable<string>;
  private subjects = new Subject<any>();
  private urls=new Subject<string>();
  private shapes = new Subject<string>()

  constructor() { 
    this.type$=this.subjects.asObservable();
    this.urls$=this.urls.asObservable();
    this.shapes$=this.shapes.asObservable();
  }
  changeType(type:any){//service for buttons color/thickness.
    this.subjects.next(type);
  }
  sendUrl(url:string){//service for image url
    this.urls.next(url);
  }
  changeShape(type:string){
    this.shapes.next(type);
  }
}
