import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BowlingLanesRoutingModule } from './bowling-lanes/bowling-lanes-routing.module';
import { BowlingLaneModule } from './bowling-lanes/bowling-lane.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BowlingLanesRoutingModule,
    BowlingLaneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
