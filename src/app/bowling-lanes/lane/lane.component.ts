import { Component, Input, OnInit } from '@angular/core';
import { PlayerData } from '../services/interfaces/player-data.interface';
import {ScoreService} from '../services/score.service';
import {PlayerDataService} from '../services/player-data.service';

@Component({
  selector: 'app-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.scss']
})
export class LaneComponent implements OnInit {
  public score: any;
  public player: any;

  constructor(private _scoreDataService: ScoreService, private _playerDataService: PlayerDataService ) { }

  ngOnInit(): void {
    this.score = this._scoreDataService.getScore();
    this.player = this._playerDataService.getPlayer();
  }

  addPins(pins: number) {
    this._scoreDataService.setScore(pins);
    this.score = this._scoreDataService.getScore();
  }
}
