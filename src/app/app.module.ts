import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BowlingLanesComponent } from './bowling-lanes/bowling-lanes.component';
import { BowlingLanesRoutingModule } from './bowling-lanes/bowling-lanes-routing.module';
import { BowlingLanesModule } from './bowling-lanes/bowling-lanes.module';

@NgModule({
  declarations: [
    AppComponent,
    BowlingLanesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BowlingLanesRoutingModule,
    BowlingLanesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
