import { Injectable } from '@angular/core';
import { Common} from 'src/app/bowling-lane/utilis/common';

import { GAME_CONFIGURATIONS } from '../models/game-configurations.constant';

import { ScoreFrameInterface } from '../models/scores.interface';

import { ScoreboardInterface } from '../models/scoreboard.interface';
import { TechnicalTermsEnum } from '../models/technicalTerms.enum';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _CONFIG = GAME_CONFIGURATIONS;
  private _MAX_NUMBER_FRAMES_PER_PLAYER = this._CONFIG.MAX_NUMBER_FRAMES_PER_PLAYER;
  private _MAX_NUMBER_THROWS_PER_ROUND = this._CONFIG.MAXIMUM_NUMBER_THROWS_PER_ROUND;
  private _MAX_NUMBER_PINS = this._CONFIG.MAX_NUMBER_PINS;
  private _STRIKE = this._CONFIG.STRIKE;
  private _MIN_VALUE = 0;

  private _currentRound = 1;
  private _currentThrow = 1;
  private _scoreboard: any;
  private _errorMessage: string;
  private _defaultErrorMessage = 'An error has occurred. Please restart the game.';
  private _scores: ScoreFrameInterface[];
  private _lastScore = 0;
  private _isEndGame: boolean;

  constructor() {
    this.initScoreboard();
  }

  public initScoreboard() {
    this._currentRound = 1;
    this._currentThrow = 1;
    this._isEndGame = false;
    this._scores = Array.from(
      { length: this._MAX_NUMBER_FRAMES_PER_PLAYER },
      _ => {
        return {
          totalScore: 0,
          scores: Array.from(
          { length: this._MAX_NUMBER_THROWS_PER_ROUND },
          () => ({ pins: 0, score: 0, rest: this._MAX_NUMBER_PINS, term: null})
        )};
      }
    );
  }

  updateScoreboard(pins: number): ScoreboardInterface {
    if(!Common.isBetween(pins, this._MIN_VALUE, this._MAX_NUMBER_PINS)) {
      this._errorMessage = this._defaultErrorMessage;
      console.log(`updateScoreboard, number pins must be isBetween ${this._MIN_VALUE} and ${this._MAX_NUMBER_PINS}`);
    }

    if (this._errorMessage || this._isEndGame) return;

    this._setNewScore(pins);

    this._incrementRoundsAndThrows(pins);

    return this.scoreboard;
  }

  get scoreboard(): ScoreboardInterface {
    return this._scoreboard = {
      currentRound: this._currentRound,
      currentThrow: this._currentThrow,
      isEndGame: this._isEndGame,
      scores: this._scores,
      error: this._errorMessage
    };
  }

  private _updateCurrentRound(currentRound: number) {
    if(!Common.isBetween(currentRound, this._MIN_VALUE, this._MAX_NUMBER_FRAMES_PER_PLAYER)) {
      this._errorMessage = this._defaultErrorMessage;
      console.warn(`updateCurrentRound, currentRound must be isBetween ${this._MIN_VALUE} and ${this._MAX_NUMBER_FRAMES_PER_PLAYER}`
      );
    }

    if (this._errorMessage) return;

    this._currentRound = currentRound;
  }

  private _updateCurrentThrow(currentThrow) {
    if(!Common.isBetween(currentThrow, this._MIN_VALUE, this._MAX_NUMBER_THROWS_PER_ROUND)) {
      this._errorMessage = this._defaultErrorMessage;
      console.log(`updateCurrentThrow, currentThrow must be isBetween ${this._MIN_VALUE} and ${this._MAX_NUMBER_THROWS_PER_ROUND}`);
    }

    if (this._errorMessage) return;

    this._currentThrow = currentThrow;
  }

  private _setNewScore(pins) {
    const scoreFrame = this.scoreboard.scores[this._currentRound - 1];
    const score = scoreFrame.scores[0];
    const totalPins = score.pins + pins;
    const rest = score.rest - pins;
    let term: string;

    if (
      this._currentThrow === this._MAX_NUMBER_THROWS_PER_ROUND &&
      totalPins === this._MAX_NUMBER_PINS
    ) {
      term = TechnicalTermsEnum.SPARE
    }
    else if (
      this._currentThrow === 1 &&
      totalPins === this._MAX_NUMBER_PINS
    ) {
      term = TechnicalTermsEnum.STRIKE
    }
    else {
      term = TechnicalTermsEnum.HOLE;
    }

    scoreFrame.totalScore = this._lastScore + totalPins;
    scoreFrame.scores[this._currentThrow - 1] = { pins, score: pins, rest, term }
    this._lastScore = scoreFrame.totalScore;
  }

  private _incrementRoundsAndThrows(pins: number) {
    if (pins === this._STRIKE && this._currentThrow === 1) {
      this._updateCurrentThrow(this._MAX_NUMBER_THROWS_PER_ROUND);
    }

    if (this._currentThrow !== this._MAX_NUMBER_THROWS_PER_ROUND) {
      this._updateCurrentThrow(this._currentThrow + 1);
    }
    else if (this._currentRound !== this._MAX_NUMBER_FRAMES_PER_PLAYER) {
      this._updateCurrentThrow(1);
      this._updateCurrentRound(this._currentRound + 1)
    }
    else {
      this._isEndGame = true;
    }
  }

}
