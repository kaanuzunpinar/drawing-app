import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavingService {
  images$!: Observable<any>;
  private subjects = new Subject<string>();

  pick$!:Observable<any>;
  private pickedSubjects = new Subject<any>();

  constructor() { 
    this.images$=this.subjects.asObservable();
    this.pick$=this.pickedSubjects.asObservable();
  }

  sendURL(image:string): void{
    this.subjects.next(image);
  }
  pickImage(image:string){
    this.pickedSubjects.next(image);
  }
}
