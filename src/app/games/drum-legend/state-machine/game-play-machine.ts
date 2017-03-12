
import { Store } from '@ngrx/store';
import {
  SET_PATTERN, AWAIT_PLAYER_PATTERN, SCORE_PATTERN, GET_SCORE, RESET_GAME,
  SEND_STROKE, PAUSE, RESUME
} from './game-play-reducer';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {GamePlayState} from './game-play-state';


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

  pauseForMessages() {
    this.store.dispatch({ type: PAUSE });
  }

  resume() {
    this.store.dispatch({type: RESUME});
  }

  resetGame() {
    this.store.dispatch({ type: RESET_GAME });
  }

  scorePattern() {
    this.store.dispatch({ type: SCORE_PATTERN });
  }

  sendStroke(stroke: string) {
    this.store.dispatch({ type: SEND_STROKE, payload: { stroke: stroke } });
  }
}
