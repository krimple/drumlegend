import {Rudiment} from './rudiment';
export enum GameState { NOT_STARTED, PAUSED, PLAYING, SHOWING_MESSAGES, FINAL_SCORE };
export class GamePlayState {
  rudiment: Rudiment;
  receivedPattern: string;
  displayedPattern: string;
  timeLeft: number;
  correctMatches: number;
  levelScore: number;
  totalScore: number;
  rudimentId: number;
  rudimentPosition: number;
  gameState: GameState = GameState.NOT_STARTED;
  message: string;
  challengeTimeInSeconds: number;
  scoreLog: GamePlayLevelScoring[] = [];
}

export class GamePlayLevelScoring {
  constructor(public rudiment: Rudiment, public matches: number, public totalScore: number) {}
}
