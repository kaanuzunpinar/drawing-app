import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LineService {
  lines:Array<fabric.Line>;
  canvas:fabric.Canvas | undefined;


  constructor() {
    this.lines=[];
   }
   create(canvas:fabric.Canvas){
     this.canvas=canvas;
   }


   add(line:fabric.Line){
     this.lines.push(line);
   }
   hide(color:string,size:number){
     if(size>0){
      for(let l1 of this.lines){
        if(l1.fill==color && l1.strokeWidth==size){
          l1.opacity=0;
        }
      }
     }
     else{
      for(let l1 of this.lines){
        if(l1.fill==color){
          l1.opacity=0;
        }
      }
     }
    this.canvas?.renderAll();
   }

   show(color:string,size:number){
    if(size>0){
      for(let l1 of this.lines){
        if(l1.fill==color  && l1.strokeWidth==size){
          l1.opacity=1;
        }
      }
    }
    else{
      for(let l1 of this.lines){
        if(l1.fill==color){
          l1.opacity=1;
        }
      }
    }
    
    
    this.canvas?.renderAll();
   }
}
