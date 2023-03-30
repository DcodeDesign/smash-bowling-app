import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BowlingLaneRoutingModule } from './bowling-lane/bowling-lane-routing.module';
import { BowlingLaneModule } from './bowling-lane/bowling-lane.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BowlingLaneRoutingModule,
    BowlingLaneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
