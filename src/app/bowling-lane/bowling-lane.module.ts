import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BowlingLaneRoutingModule } from './bowling-lane-routing.module';

import { ScoreboardComponent } from './lane/scoreboard/scoreboard.component';
import { LaneComponent } from './lane/lane.component';
import { FramesComponent } from './lane/frames/frames.component';

import { GameService } from './services/game.service';

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
    ReactiveFormsModule,
    BowlingLaneRoutingModule,
  ],
  providers: [
    GameService
  ]
})
export class BowlingLaneModule { }
