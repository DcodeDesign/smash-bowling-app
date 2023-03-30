export interface ScoreFrameInterface {
  totalScore: number,
  scores: ScoreInterface[]
}

export interface ScoreInterface {
  pins: number,
  score: number,
  rest: number;
  term: string;
}
