import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { MenuComponent } from './menu/menu.component';
import { SavedImgComponent } from './saved-img/saved-img.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    MenuComponent,
    SavedImgComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
