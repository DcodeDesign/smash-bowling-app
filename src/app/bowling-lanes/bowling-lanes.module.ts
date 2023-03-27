import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BowlingLanesRoutingModule } from './bowling-lanes-routing.module';
import { ScoreboardComponent } from './lane/scoreboard/scoreboard.component';
import { LaneComponent } from './lane/lane.component';
import { FramesComponent } from './lane/frames/frames.component';
import {SharedModule} from '../shared/shared.module';
import {ScoreService} from './services/score.service';
import {PlayerDataService} from './services/player-data.service';

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
    ScoreService,
    PlayerDataService
  ]
})
export class BowlingLanesModule { }
