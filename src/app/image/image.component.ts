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
  url:string="";//url for uploading image.
  isDown:boolean=false;
  line:any;
  constructor() { }
 
  ngOnInit(): void {
    this.canvas =new fabric.Canvas('c',{
      selection:false,
    });
  }
  onFileChanged(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", (ev:any)=> {
        this.url=ev.target.result;
        var imgElement = document.createElement('img');
        imgElement.src=this.url;
        imgElement.onload= ()=>{
          var imageinstance = new fabric.Image(imgElement, {
            angle: 0,
            opacity: 1,
            cornerSize: 10,
          });
          imageinstance.lockMovementX=true;
          imageinstance.lockMovementY=true;
          imageinstance.lockRotation=true;
          imageinstance.lockScalingX=true;
          imageinstance.lockScalingY=true;
          imageinstance.evented=false;
          this.canvas.add(imageinstance)
          this.canvas.setWidth(imgElement.width);
          this.canvas.setHeight(imgElement.height);
          this.canvas.on('mouse:down',(o:any)=>{
            this.isDown = true;
            var pointer = this.canvas.getPointer(o.e);
            var points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
            this.line = new fabric.Line(points, {
              strokeWidth: 5,
              fill: 'red',
              stroke: 'red',
              originX: 'center',
              originY: 'center'
            });
            this.canvas.add(this.line);
          });
          this.canvas.on('mouse:move', (o:any)=>{
            if (!this.isDown) return;
            var pointer = this.canvas.getPointer(o.e);
            this.line.set({ x2: pointer.x, y2: pointer.y });
            this.canvas.renderAll();
          });
          this.canvas.on('mouse:up', (o:any)=>{
            this.isDown = false;
          });
        }
      }, false);
    }
    
  }
  debugBase64(base64URL:any){
    var win = window.open();
    win?.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
    win?.document.close();
  }


  save():void{
    this.debugBase64(this.canvas.toDataURL({
      format: 'jpeg',
    }));
    
  }
}
