import { DataRounds } from './data-rounds.interface';

export interface Frames {
  playerId: number;
  numberCurrentRound: number;
  dataRounds: DataRounds[];
}
