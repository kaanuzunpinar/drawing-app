import { Component, OnInit } from '@angular/core';
import { SavingService } from '../saving.service';
import {fabric} from 'fabric';

@Component({
  selector: 'app-saved-img',
  templateUrl: './saved-img.component.html',
  styleUrls: ['./saved-img.component.css']
})
export class SavedImgComponent implements OnInit { 
  index:number=1;
  constructor(private saveService:SavingService) {
    saveService.images$.subscribe((url)=>{
      let image= document.createElement('img');
      image.src=url;
      image.width=100;
      image.height=100;
      image.style.borderRadius="50%";
      console.log(image);
      let li=document.createElement('li');
      let text=document.createElement('div');
      text.innerHTML=`<span class="text-muted">Image ${this.index++}</span>`;
      let element=document.getElementsByTagName('ul')[3];
      li.style.textAlign="center"
      li.appendChild(text);
      li.appendChild(image);
      li.addEventListener("click",(e)=>{
        this.saveService.pickImage(url);
      });
      li.addEventListener("mouseenter",(e)=>{
        li.style.background="grey";
      })
      li.addEventListener("mouseleave",(e)=>{
        li.style.background="none";
      })
      element?.appendChild(li);
    })
   }

  ngOnInit(): void {
  }

}
