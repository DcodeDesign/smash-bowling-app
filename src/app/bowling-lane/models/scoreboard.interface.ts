import { ScoreFrameInterface } from './scores.interface';

export interface ScoreboardInterface {
  currentThrow: number;
  currentRound: number;
  scores: ScoreFrameInterface[];
  error: string;
  isEndGame: boolean;
}
