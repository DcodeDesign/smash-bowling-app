import { Component, OnInit } from '@angular/core';
import { GameService} from '../services/game.service';
import { ScoreFrameInterface, ScoreInterface } from '../models/scores.interface';
import { ScoreboardInterface } from '../models/scoreboard.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.scss']
})
export class LaneComponent implements OnInit {
  public score: ScoreFrameInterface[] = [];
  public player: { name: string; };
  public currentRound: number;
  public currentThrow: number;
  public isEndGame: boolean;
  public errorMessage: string;

  private scoreboard: ScoreboardInterface;
  private lastFrameScore: ScoreFrameInterface;
  public firstThrows: ScoreInterface;

  constructor(private _gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.parseScoreGame();
  }

  public onNumberDroppedPins(pins: number) {
    this._gameService.updateScoreboard(pins);
    this.parseScoreGame();
  }

  public parseScoreGame() {
    this.scoreboard = this._gameService.scoreboard;

    this.currentRound = this.scoreboard.currentRound;
    this.currentThrow = this.scoreboard.currentThrow;

    this.isEndGame = this.scoreboard.isEndGame;
    this.errorMessage = this.scoreboard.error;

    this.score = this.scoreboard.scores;
    this.lastFrameScore = this.score[this.currentRound - 1]
    this.firstThrows = this.lastFrameScore.scores[0]
  }

  restart () {
    this._gameService.initScoreboard();
    this.parseScoreGame()
  }

}
