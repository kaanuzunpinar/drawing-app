import { Component, OnInit } from '@angular/core';
import { fabric }  from "fabric";
import { IDataURLOptions } from 'fabric/fabric-impl';
import { ButtonService } from '../button.service';
import { HistoryService, Change } from '../history.service';
import { LineService } from '../line.service';
import { SavingService } from '../saving.service';

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

  scaled=false;
  scaledWidth=1;
  scaledHeight=1;

  imageInstance?:fabric.Image;

  images:Array<any>=[];//array for saved images.
  shape:string="line";

  constructor(
    private service:ButtonService,
    public history:HistoryService,
    private lineService:LineService,
    private saveService:SavingService) {

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
    this.saveService.pick$.subscribe((image)=>{
      this.url=image;
      this.createImage();
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
      
      this.imageInstance = new fabric.Image(imgElement, {
        angle: 0,
        opacity: 1,
        cornerSize: 10,
        
      });
      this.scaled=false;
      this.scaledHeight=1;
      this.scaledWidth=1;


      if(imgElement.width>600){
        this.scaled=true;
        this.imageInstance.scaleToWidth(500);
        this.scaledWidth=imgElement.width/this.imageInstance.getScaledWidth();
      }
      if(this.imageInstance.getScaledHeight()>600){
        this.scaled=true;
        this.imageInstance.scaleToHeight(500);
        this.scaledHeight=imgElement.height/this.imageInstance.getScaledHeight();
      }
      this.imageInstance.lockMovementX = true;
      this.imageInstance.lockMovementY = true;
      this.imageInstance.lockRotation = true;
      this.imageInstance.lockScalingX = true;
      this.imageInstance.lockScalingY = true;
      this.imageInstance.evented = false;
      this.canvas.clear();
      this.canvas.add(this.imageInstance);
      this.canvas.setWidth(this.imageInstance.getScaledWidth());
      this.canvas.setHeight(this.imageInstance.getScaledHeight());
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
            lockMovementX:true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingX: true,
            lockScalingY: true,
            evented: false,
          })
          this.canvas.add(point);
          this.lineService.add(point);//for filtering.
          this.history.addLine(point);//for undo and redo
        }
        
      });




      this.canvas.on('mouse:move', (o: any) => {
        if(this.shape=="line"){
          if (!this.isDown) return;
        var pointer = this.canvas.getPointer(o.e);
        this.line.set({ x2: pointer.x, y2: pointer.y });
        this.canvas.renderAll();
        }
        
  
      });




      this.canvas.on('mouse:up', (o: any) => {
        this.isDown = false;
      });

    }

    
  }

  filter(param:string|number){//choose color/thickness
    let beforeColor=this.filteredColor;
    let beforeSize=this.filteredSize;
    if(typeof param == 'string'){
      this.filteredColor=param;
    } 
    else{
      this.filteredSize=param;
    }
    let array=this.lineService.filter(this.filteredColor,this.filteredSize);
    if(array.length>0)
      this.history.filterLines({fC:this.filteredColor,fS:this.filteredSize,bC:beforeColor,bS:beforeSize});
  }

  undo(){
    let returned:Change =this.history.undo();
    if(returned){
      this.filteredColor=returned.obj?.bC;
      this.filteredSize=returned.obj?.bS;
      this.lineService.filter(this.filteredColor,this.filteredSize);
    }
    this.canvas.renderAll();
  }
  redo(){
    let returned:Change=this.history.redo();
    if(returned){
      this.filteredColor=returned.obj?.fC;
      this.filteredSize=returned.obj?.fS;
      this.lineService.filter(this.filteredColor,this.filteredSize);
    }
    this.canvas.renderAll();
  }

  showAll(){
    let beforeColor=this.filteredColor
    let beforeSize=this.filteredSize
    this.filteredColor='';
    this.filteredSize=-1;
    let array=this.lineService.showAll();
    if(array.length>0)
        this.history.showAllLines({fC:this.filteredColor,fS:this.filteredSize,bC:beforeColor,bS:beforeSize});
    this.canvas.renderAll();
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
    var downloadUrl=this.canvas.toDataURL({
      format: 'png', 
      multiplier: this.scaledWidth*this.scaledHeight, 
      left: 0, 
      top: 0, 
    });

    this.debugBase64(downloadUrl);
    this.saveService.sendURL(dataUrl);
  }
  //end of save methods.

  
}
