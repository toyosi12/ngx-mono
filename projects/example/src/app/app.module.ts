import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxMonoModule } from 'ngx-mono'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxMonoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
