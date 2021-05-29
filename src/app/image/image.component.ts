import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  constructor() { }
  url:string="";
  ngOnInit(): void {
  }
  onFileChanged(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", (ev:any)=> {
        this.url=ev.target.result;
      }, false);
    }
  }
  save():void{
    
  }
}
