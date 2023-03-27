import { Injectable } from '@angular/core';
import { PlayerData } from './interfaces/player-data.interface';
import { GAME_CONFIGURATIONS } from '../models/game-configurations.constant';

@Injectable({
  providedIn: 'root'
})
export class ScoreService{
  private _scoreData: any;
  private _CONFIG = GAME_CONFIGURATIONS;
  private _MAX_NUMBER_FRAMES_PER_PLAYER = this._CONFIG.MAX_NUMBER_FRAMES_PER_PLAYER;
  private _MAXIMUM_NUMBER_THROWS_PER_ROUND = this._CONFIG.MAXIMUM_NUMBER_THROWS_PER_ROUND;
  private _currentRound = 0;
  private _currentThrow = 0;

  constructor() {
    this.initScore();
  }

  initScore(): void {
    this._scoreData = Array.from(
      { length: this._MAX_NUMBER_FRAMES_PER_PLAYER },
      _ => {
        return Array.from(
          { length: this._MAXIMUM_NUMBER_THROWS_PER_ROUND },
          () => ({ pins: 0, score: 0 })
        );
      }
    );
  }

  getScore(): any {
    return this._scoreData;
  }

  setScore(pins): void {
    if (this._currentRound !== this._MAX_NUMBER_FRAMES_PER_PLAYER) {
      this._scoreData[this._currentRound][this._currentThrow].pins = pins.throw;
      this._scoreData[this._currentRound][this._currentThrow].score = pins.throw;

      this._setCurrentRound();
      this._setCurrentThrow();
    } else {
      console.log('End Game');
    }
  }

  private _setCurrentRound() {
    if (this._currentThrow === this._MAXIMUM_NUMBER_THROWS_PER_ROUND - 1) {
      this._currentRound += 1;
    }
  }

  private _setCurrentThrow() {
    if (this._currentThrow < this._MAXIMUM_NUMBER_THROWS_PER_ROUND - 1) {
      this._currentThrow += 1;
    } else {
      this._currentThrow = 0;
    }
  }
}
