
import { Store } from '@ngrx/store';
import {
  CONTINUE, NEXT_PATTERN, AWAIT_PLAYER_PATTERN, SCORE_PATTERN, GET_SCORE, RESET_GAME,
  SEND_STROKE, PAUSE, RESUME, DECREMENT_TIME_IN_SECONDS
} from './game-play-reducer';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {GamePlayState} from './game-play-state';
import {type} from 'os';


@Injectable()
export class GamePlayMachine {
  gamePlayState: Observable<GamePlayState>;

  constructor(private store: Store<GamePlayState>) {
    this.gamePlayState = store.select('gamePlay');
  }

  nextTurn() {
      const self = this;
      this.store.dispatch({ type: CONTINUE, payload: { timeLeftInSeconds: 60 });
      const interval = setInterval(() => {
          this.store.dispatch({ type: DECREMENT_TIME_IN_SECONDS });
          this.store.dispatch({ type: PAUSE });
      }, 
  }

  updateTimeTicks(tick: number) {
      this.store.dispatch( type: SET_TIME_TICK, payload: { tick: tick });
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
