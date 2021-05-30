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
    /*var save=document.getElementById('link') as HTMLAnchorElement;
    save.href = this.canvas.toDataURL({
      format: 'jpeg',
    });*/
    
  }
}
