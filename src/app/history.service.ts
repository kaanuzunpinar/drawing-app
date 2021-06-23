import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  undostack:Array<any>;
  redostack:Array<any>;
  constructor() {
    this.undostack=[];
    this.redostack=[];
   }

   addLine(line:fabric.Object){
     let change=new Change("add");
     change.line=line;
     this.undostack.push(change);
   }

   filterLines(ob1:object){
    let change=new Change("filter");
    change.obj=ob1;
    this.undostack.push(change);
   }


   showAllLines(ob1:object){
    let change=new Change("show");
    change.obj=ob1;
    this.undostack.push(change);
   }

   undo():any {
    if(this.undostack.length==0)
    return;
    let change=this.undostack.pop();
    this.redostack.push(change);
    if(change.type=="add"){
      change.line.opacity=0;
    }
    else{
      return change;
    }
   }

   redo(){
     if(this.redostack.length==0)
     return;
    let change=this.redostack.pop();
    this.undostack.push(change);
    if(change.type=="add"){
      change.line.opacity=1;
    }
    else{
      return change;
    }
  }
}

export class Change{
  type:string="";
  line?:fabric.Object;
  obj?:any;
  constructor(type:string){
    this.type=type;
  }
}
