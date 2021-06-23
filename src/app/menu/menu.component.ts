import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonService } from '../button.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  constructor(private service:ButtonService) { }
  url:string="";
  ngOnInit(): void {
  }
  color(e:string){
    this.service.changeType(e);
  }
  shape(s:string){
    this.service.changeShape(s);
  }
  thick(t:number){
    this.service.changeType(t);
  }
  onFileChanged(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", (ev:any)=> {
        this.service.sendUrl(ev.target.result);
      });
  }
  }
}
