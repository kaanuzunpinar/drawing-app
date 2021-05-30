import { Component, OnInit } from '@angular/core';
import { fabric }  from "fabric";
import { Canvas, Image } from 'fabric/fabric-impl';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  canvas:any;
  constructor() { }
  url:string="";
  ngOnInit(): void {
    this.canvas=new fabric.Canvas('c');
    
  }
  onFileChanged(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
    /*  reader.onload=(e)=>{
        this.url=e.target?.result as string;
      }*/
      reader.addEventListener("load", (ev:any)=> {
        this.url=ev.target.result;
        var a1 = document.createElement('img');
        a1.src=this.url;
        a1.onload= ()=>{
          var imageinstance = new fabric.Image(a1, {
            angle: 0,
            opacity: 1,
            cornerSize: 30,
          });
          this.canvas.add(imageinstance)
        }
       /* var imgElement:any = document.getElementById('image');
        var imgInstance = new fabric.Image(imgElement);
  //  imgInstance=fabric.Image.fromURL( this.url);
        this.canvas.add(imgInstance);
        console.log(this.url+" 12312")*/
      }, false);
    }
    
  }
  save():void{
    
  }
}
