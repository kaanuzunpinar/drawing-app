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

   addLine(line:fabric.Line){
     let change=new Change("add");
     change.line=line;
     this.undostack.push(change);
   }
   showLines(array:Array<fabric.Line>){
    let change=new Change("show");
    change.array=array;
    this.undostack.push(change);
   }
   hideLines(array:Array<fabric.Line>){
    let change=new Change("hide");
    change.array=array;
    this.undostack.push(change);
   }

   undo() {
    if(this.undostack.length==0)
    return;
    let change=this.undostack.pop();
    if(change.type=="add"){
      change.line.opacity=0;
    }
    else if(change.type=="show"){
      for(let line of change.array){
        line.opacity=0;
      }
    }
    else{
      for(let line of change.array){
        line.opacity=1;
      }
    }
    this.redostack.push(change);
   }

   redo(){
     if(this.redostack.length==0)
     return;
    let change=this.redostack.pop();
    if(change.type=="add"){
      change.line.opacity=1;
    }
    else if(change.type=="show"){
      for(let line of change.array){
        line.opacity=1;
      }
    }
    else{
      for(let line of change.array){
        line.opacity=0;
      }
   }
   this.undostack.push(change);
  }
}

class Change{
  type:string="";
  line?:fabric.Line;
  array?:Array<fabric.Line>;
  constructor(type:string){
    this.type=type;
  }
}
