import { Store } from '@ngrx/store';
import {
  CONTINUE, NEXT_PATTERN, AWAIT_PLAYER_PATTERN, SCORE_PATTERN, GET_SCORE, RESET_GAME,
  SEND_STROKE, PAUSE, RESUME, DECREMENT_TIME_IN_SECONDS
} from './game-play-reducer';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GamePlayState } from './game-play-state';


@Injectable()
export class GamePlayMachine {
  gamePlayState: Observable<GamePlayState>;

  constructor(private store: Store<GamePlayState>) {
    this.gamePlayState = store.select('gamePlay');
  }

  play() {
    const self = this;
    this.store.dispatch({type: CONTINUE });
    this.store.dispatch({type: 'START_TIMER', payload: { seconds: 5}});
  }

  awaitPlayerPattern() {
    this.store.dispatch({type: AWAIT_PLAYER_PATTERN});
  }

  pauseForMessages() {
    this.store.dispatch({type: PAUSE});
  }

  resume() {
    this.store.dispatch({type: RESUME});
  }

  resetGame() {
    this.store.dispatch({type: RESET_GAME});
  }

  scorePattern() {
    this.store.dispatch({type: SCORE_PATTERN});
  }

  sendStroke(stroke: string) {
    this.store.dispatch({type: SEND_STROKE, payload: {stroke: stroke}});
  }
}
