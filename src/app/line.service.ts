import { Injectable } from '@angular/core';
import { fabric }  from "fabric";

@Injectable({
  providedIn: 'root'
})
export class LineService {
  lines:Array<fabric.Object>;
  canvas:fabric.Canvas | undefined;


  constructor() {
    this.lines=[];
   }
   create(canvas:fabric.Canvas){
     this.canvas=canvas;
   }


   add(line:fabric.Object){
     this.lines.push(line);
   }
   filter(color:string,size:number):any{
     this.showAll();
     let array=[];
     if(size>0){
      if(color){
        for(let l1 of this.lines){
          if(l1 instanceof fabric.Circle){
            if(l1.fill!=color || l1.radius!=size){
              if(l1.opacity!=0){
                l1.opacity=0;
              array.push(l1);
              }
              
            }
          }
          else{
            if(l1.fill!=color || l1.strokeWidth!=size){
              if(l1.opacity!=0){
                l1.opacity=0;
              array.push(l1);
              }
              
            }
          }
         
        }
      }
      else{
        for(let l1 of this.lines){
          if(l1 instanceof fabric.Circle){
            if(l1.radius!=size){
              if(l1.opacity!=0){
                l1.opacity=0;
                array.push(l1);
              }
            }
          }
          else{
            if(l1.strokeWidth!=size){
              if(l1.opacity!=0){
                l1.opacity=0;
                array.push(l1);
              }
            }   
          }
         
        }
      }
     }
     else{
       if(!color){
         return this.showAll();
       }
      for(let l1 of this.lines){
        if(l1.fill!=color){
          if(l1.opacity!=0){
            l1.opacity=0;
            array.push(l1);
          }
        } 
       
      }
     }
    this.canvas?.renderAll();
    return array;
   }

   showAll(){
    let array=[];
     for(let l1 of this.lines){
       if(l1.opacity!=1){
        l1.opacity=1;
        array.push(l1);
       }
       
     }
     this.canvas?.renderAll();
     return array;
   }

   
}
