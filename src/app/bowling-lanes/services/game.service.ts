import { Injectable } from '@angular/core';
import { GAME_CONFIGURATIONS } from './models/game-configurations.constant';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _CONFIG = GAME_CONFIGURATIONS;
  private _MAX_NUMBER_FRAMES_PER_PLAYER = this._CONFIG.MAX_NUMBER_FRAMES_PER_PLAYER;
  private _MAXIMUM_NUMBER_THROWS_PER_ROUND = this._CONFIG.MAXIMUM_NUMBER_THROWS_PER_ROUND;

  private _player: { name: string };
  private _defaultNamePlayer = 'player';
  private _score: any;
  private _currentRound = 1;
  private _currentThrow = 1;
  private isEndGame: boolean;
  private scoreboard: any;

  constructor() {
    this.initPlayer(this._defaultNamePlayer)
    this.initScore();
  }

  initPlayer(name) {
    this._player = { name }
  }

  getPlayer() {
    return this._player;
  }

  private _getCurrentRound() {
    return this._currentRound
  }

  public updateCurrentRound(currentRound) {
    this._currentRound = currentRound;
  }

  private _getCurrentThrow() {
    return this._currentThrow
  }

  public updateCurrentThrow(currentThrow) {
    this._currentThrow = currentThrow;
  }

  initScore(): void {
    this._score = Array.from(
      { length: this._MAX_NUMBER_FRAMES_PER_PLAYER },
      _ => {
        return Array.from(
          { length: this._MAXIMUM_NUMBER_THROWS_PER_ROUND },
          () => ({ pins: 0, score: 0 })
        );
      }
    );
  }

  getScore() {
    return this._score;
  }

  private _setEndGame(isEndGame: boolean = false) {
    this.isEndGame = isEndGame;
  }

  private _getEndGame() {
    //throw new Error('Method not implemented.');
    return this.isEndGame;
  }

  getScoreboard() {
    return this.scoreboard = {
      player: this.getPlayer(),
      currentRound: this._getCurrentRound(),
      currentThrow: this._getCurrentThrow(),
      isEndGame: this._getEndGame(),
      scores: this.getScore()
    };
  }

  updateScoreboard(pins) {
    if (this._currentRound <= this._MAX_NUMBER_FRAMES_PER_PLAYER) {
      this.scoreboard.scores[this._currentRound - 1][this._currentThrow - 1].pins = pins.throw;
      this.scoreboard.scores[this._currentRound - 1][this._currentThrow - 1].score = pins.throw;

      let newCurrentRound
      let newCurrentThrow;

      if (this._currentThrow < this._MAXIMUM_NUMBER_THROWS_PER_ROUND) {
        newCurrentThrow = this._currentThrow + 1;
        this.updateCurrentThrow(newCurrentThrow)
      }
      else if (this._currentThrow >= this._MAXIMUM_NUMBER_THROWS_PER_ROUND) {
        newCurrentRound = this._currentRound + 1;
        this.updateCurrentRound(newCurrentRound)
        newCurrentThrow = 1;
        this.updateCurrentThrow(newCurrentThrow)
      }
      else {
        this.updateCurrentRound(newCurrentRound)
        this.updateCurrentThrow(newCurrentThrow)
      }
    }
    else {
      this._setEndGame(true);
    }

    return this.scoreboard;
  }
}
