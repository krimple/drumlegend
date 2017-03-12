import {Rudiment} from './rudiment';
export class GamePlayState {
  rudiment: Rudiment;
  receivedPattern: string;
  currentScore: number;
  rudimentId: number;
  rudimentPosition: number;
  paused: boolean;
  tries: number;
  message: string;
}