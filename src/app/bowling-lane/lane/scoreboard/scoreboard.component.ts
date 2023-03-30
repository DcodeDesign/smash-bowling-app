import { Component, Input, OnInit } from '@angular/core';
import { ScoreFrameInterface } from '../../models/scores.interface';
import { TechnicalTermsEnum } from '../../models/technicalTerms.enum';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent {
  @Input() scoreFrames: ScoreFrameInterface[];
  @Input() currentRound: number;
  technicalTerms = TechnicalTermsEnum;

  constructor() {}
}
