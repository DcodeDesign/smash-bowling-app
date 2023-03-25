import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BowlingLanesRoutingModule } from './bowling-lanes-routing.module';
import { ScoreboardComponent } from './lane/scoreboard/scoreboard.component';
import { LaneComponent } from './lane/lane.component';
import { FramesComponent } from './lane/frames/frames.component';

@NgModule({
  declarations: [
    ScoreboardComponent,
    LaneComponent,
    FramesComponent
  ],
  exports: [
    LaneComponent
  ],
  imports: [
    CommonModule,
    BowlingLanesRoutingModule
  ]
})
export class BowlingLanesModule { }