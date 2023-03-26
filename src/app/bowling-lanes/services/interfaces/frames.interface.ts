import { DataRounds } from './data-rounds.interface';

export interface Frames {
  id: number;
  numberCurrentRound: number;
  dataRounds: DataRounds[];
}
