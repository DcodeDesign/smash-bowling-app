import { Frames } from './frames.interface';

export interface PlayerData {
  id: number;
  playerName: string;
  isPlayerRound: boolean;
  lastScore: number;
  lastRound: number;
  frames: Frames[];
}
