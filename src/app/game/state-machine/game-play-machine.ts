
import { Store } from '@ngrx/store';
import { SET_PATTERN, AWAIT_PLAYER_PATTERN, SCORE_PATTERN, GET_SCORE, RESET_SCORE, SEND_STROKE } from './game-play';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Pattern {
  name: string;
  pattern: string;
}

export interface GamePlayState {
  currentScore: number;
  receivedPattern: string;
  pattern: Pattern;
}

@Injectable()
export class GamePlayMachine {
  gamePlayState: Observable<GamePlayState>;

  constructor(private store: Store<GamePlayState>) {
    this.gamePlayState = store.select('gamePlay');
  }

  setPattern(name: string, pattern: string) {
    this.store.dispatch({ type: SET_PATTERN, payload: {pattern: { name: name, pattern: pattern }}});
  }

  awaitPlayerPattern() {
    this.store.dispatch({ type: AWAIT_PLAYER_PATTERN });
  }

  scorePattern() {
    this.store.dispatch({ type: SCORE_PATTERN });
  }
  sendStroke(stroke: string){
    this.store.dispatch({ type: SEND_STROKE, payload: { stroke: stroke } });
  }
}
