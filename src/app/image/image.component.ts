import { Component, OnInit } from '@angular/core';
import { fabric }  from "fabric";
import { IDataURLOptions } from 'fabric/fabric-impl';
import { ButtonService } from '../button.service';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  canvas!:fabric.Canvas;
  url:string="";//url for uploading image.
  isDown:boolean=false;
  line!:fabric.Line;
  lineColor:string="black";
  lineThickness:number=4;

  constructor(private service:ButtonService) {

    this.service.type$.subscribe((data) => {
      if(typeof(data)=='number'){
        this.lineThickness=data;
      }
      else{
        this.lineColor=data;
      }
    });

    this.service.urls$.subscribe((urlS)=>{
      this.url=urlS;
      this.createImage();
    });
    
   }
 
  ngOnInit(): void {
    this.canvas =new fabric.Canvas('c',{
      selection:false,
    });
  }
  createImage(){
    var imgElement = document.createElement('img');
    imgElement.src = this.url;
    imgElement.onload = () => {
      //
      // Basic configurations about image object of fabric
      //
      var imageinstance = new fabric.Image(imgElement, {
        angle: 0,
        opacity: 1,
        cornerSize: 10,
      });
      imageinstance.lockMovementX = true;
      imageinstance.lockMovementY = true;
      imageinstance.lockRotation = true;
      imageinstance.lockScalingX = true;
      imageinstance.lockScalingY = true;
      imageinstance.evented = false;
      this.canvas.add(imageinstance)
      this.canvas.setWidth(imgElement.width);
      this.canvas.setHeight(imgElement.height);

      //
      // End of configurations.
      //


      //Adding listeners to canvas.

      this.canvas.on('mouse:down', (o: any) => {
        this.isDown = true;
        var pointer = this.canvas.getPointer(o.e);
        var points = [pointer.x, pointer.y, pointer.x, pointer.y];
        this.line = new fabric.Line(points, {
          strokeWidth: this.lineThickness,
          fill: this.lineColor,
          stroke: this.lineColor,
          originX: 'center',
          originY: 'center'
        });
        this.canvas.add(this.line);
      });




      this.canvas.on('mouse:move', (o: any) => {
        if (!this.isDown) return;
        var pointer = this.canvas.getPointer(o.e);
        this.line.set({ x2: pointer.x, y2: pointer.y });
        this.canvas.renderAll();
  
      });




      this.canvas.on('mouse:up', (o: any) => {
        this.isDown = false;
        
      });
    }

    
  }
  debugBase64(base64URL:any){
    var win = window.open();
    var link = win?.document.createElement("a");
    link!.href=base64URL;
    link!.download="new_image"
    win?.document.body.appendChild(link!);
    link!.click();
    win?.document.body.removeChild(link!);
    win?.document.write('<img src="' + base64URL  + '" ></img>');
    win?.document.close();
  }

  save():void{
    var dataUrl=this.canvas.toDataURL('download' as IDataURLOptions);
    this.debugBase64(dataUrl);
  }
}
