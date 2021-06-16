import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  undostack:any;
  redostack:any;
  constructor() {
    this.undostack=[];
    this.redostack=[];
   }

   add(line:fabric.Line){
     this.undostack.push(line);
   }

   undo(canvas:fabric.Canvas) {
    var line=this.undostack.pop();
    this.redostack.push(line);
    canvas.remove(line);
   }

   redo(){
    var line=this.redostack.pop();
    this.undostack.push(line);
   }
}
