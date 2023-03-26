import { Injectable } from '@angular/core';
import { PlayerData } from './interfaces/player-data.interface';
import { GAME_CONFIGURATIONS } from '../models/game-configurations.constant';


@Injectable({
  providedIn: 'root'
})
export class ScoreService{
  playerData: PlayerData[] = [];

  constructor() {
    this.init();
  }

  init(): void {
    this.playerData = Array(1).fill({
                                playerName: 'Jhon doe',
                                scores: Array(GAME_CONFIGURATIONS.MAX_NUMBER_FRAMES_PER_PLAYER)
                                  .fill([0 , 0])
                              });
  }

  getScore(): void {

  }

  addScore(): void {

  }
}
