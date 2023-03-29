import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BowlingLanesRoutingModule } from './bowling-lanes-routing.module';
import { SharedModule } from '../shared/shared.module';

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
    SharedModule,
    BowlingLanesRoutingModule
  ],
  providers: [
    GameService
  ]
})
export class BowlingLaneModule { }
