export interface ScoreFrameInterface {
  totalScore: number,
  scoreFrames: ScoreInterface[]
}

export interface ScoreInterface {
  pins: number,
  score: number,
  rest: number;
  term: string;
}
