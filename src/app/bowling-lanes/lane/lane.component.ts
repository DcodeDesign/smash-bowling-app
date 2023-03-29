import {Component, Input, OnInit} from '@angular/core';
import {GameService} from '../services/game.service';
import { GAME_CONFIGURATIONS } from '../services/models/game-configurations.constant';

@Component({
  selector: 'app-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.scss']
})
export class LaneComponent implements OnInit {
  public score: any [] = [];
  public player: { name: string; };
  public currentRound: number;
  public currentThrow: number;
  public isEndGame: boolean;
  public scoreboard: { player: { name: string; }; currentRound: number; currentThrow: number; isEndGame: boolean; scores: any; };

  constructor(private _gameService: GameService) { }

  ngOnInit() {
    this.parseScoreGame();
  }

  public onNumberDroppedPins(pins: number) {
    this._gameService.updateScoreboard(pins);
    this.parseScoreGame();
  }

  public parseScoreGame() {
    this.scoreboard = this._gameService.getScoreboard();

    this.score = this.scoreboard.scores;
    this.player = this.scoreboard.player;
    this.currentRound = this.scoreboard.currentRound;
    this.currentThrow = this.scoreboard.currentThrow;
    this.isEndGame = this.scoreboard.isEndGame;
  }
}
