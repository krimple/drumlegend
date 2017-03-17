import {Rudiment} from './rudiment';
export class GamePlayState {
  rudiment: Rudiment;
  receivedPattern: string;
  correctMatches: number;
  currentScore: number;
  rudimentId: number;
  rudimentPosition: number;
  paused: boolean;
  message: string;
  timeLeft: number;
  scoreLog: GamePlayLevelScoring[] = [];
}

export class GamePlayLevelScoring {
  rudiment: Rudiment;
  matches: number;
  totalScore: number;
}
