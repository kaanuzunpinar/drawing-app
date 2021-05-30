import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonService } from '../button.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  constructor(private service:ButtonService) { }

  ngOnInit(): void {
  }
  color(e:string){
    this.service.changeType(e);
  }
  thick(t:number){
    this.service.changeType(t);
  }
}
