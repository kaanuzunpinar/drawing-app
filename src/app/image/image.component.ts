import { Component, OnInit } from '@angular/core';
import { fabric }  from "fabric";
import { IDataURLOptions } from 'fabric/fabric-impl';
import { ButtonService } from '../button.service';
import { HistoryService } from '../history.service';
import { LineService } from '../line.service';

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

  filteredColor:string="";
  filteredSize:number=-1;

  images:Array<any>=[];
  shape:string="line";

  constructor(
    private service:ButtonService,
    public history:HistoryService,
    private lineService:LineService) {

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
    
    this.service.shapes$.subscribe((shapeS)=>{//subscription for line or point
      this.shape=shapeS;
    });
    
   }
 
  ngOnInit(): void {
    this.canvas =new fabric.Canvas('c',{
      selection:false,
    });
    this.lineService.create(this.canvas);
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
        
        if(this.shape=="line"){
        this.line = new fabric.Line(points, {
          strokeWidth: this.lineThickness,
          fill: this.lineColor,
          stroke: this.lineColor,
          originX: 'center',
          originY: 'center'
        });
        this.canvas.add(this.line);
        this.lineService.add(this.line);//for filtering.
        this.history.addLine(this.line);//for undo and redo
        }



        else{
          let point:fabric.Circle =new fabric.Circle({
            left:pointer.x,
            top:pointer.y,
            originX:'center', originY:'center',
            radius: this.lineThickness,
            strokeWidth:1,
            stroke:this.lineColor,
            fill:this.lineColor,
          })
          this.canvas.add(point);
        }
        
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

  filter(param:string|number){//choose color/thickness
    if(typeof param == 'string'){
      this.filteredColor=param;
    } 
    else{
      this.filteredSize=param;
    }
  }


  showHide(show:boolean){
    if(show){
      let array=this.lineService.show(this.filteredColor,this.filteredSize);
      if(array.length>0)
        this.history.showLines(array);
    }
    else{
      let array= this.lineService.hide(this.filteredColor,this.filteredSize)
      if(array.length>0)
        this.history.hideLines(array);
    }
  }


  pxToText(size:number):string{//Convert for px to mid, thick etc.
    switch(size){
      case 2: return "Lower";
      case 4: return "Low";
      case 6: return "Mid";
      case 10: return "High";
      case 20: return "Higher";
      default: return "";
    }
  }



  //Methods for Saving the edited image:
  debugBase64(base64URL:any){
    var win = window.open();
    var link = win?.document.createElement("a");
    link!.href=base64URL;
    link!.download="new_image"
    win?.document.body.appendChild(link!);
    link!.click();
    win?.document.close();
    win?.close();
  }

  save():void{
    var dataUrl=this.canvas.toDataURL('download' as IDataURLOptions);
    this.debugBase64(dataUrl);
    this.images.push(dataUrl);
  }
  //end of save methods.

  pickImage(image:string){
    this.url=image;
    this.createImage();
  }
}
