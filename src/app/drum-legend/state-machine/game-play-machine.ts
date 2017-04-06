import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { GamePlayState } from './state-definitions/game-play-state';
import * as actions from './actions/game-actions';


@Injectable()
export class GamePlayMachine {
  gamePlayState: Observable<GamePlayState>;

  constructor(private store: Store<GamePlayState>) {
    this.gamePlayState = store.select('gamePlay');
  }

  play() {
    const self = this;
    this.store.dispatch(new actions.BeginGameAction());
  }

  awaitPlayerPattern() {
    this.store.dispatch(new actions.AwaitPlayerPatternAction());
  }

  pauseForMessages() {
    this.store.dispatch(new actions.PauseAction());
  }

  resume() {
    this.store.dispatch(new actions.ResumeAction());
  }

  resetGame() {
    this.store.dispatch(new actions.ResetGameAction());
  }

  scorePattern() {
    this.store.dispatch(new actions.ScorePatternAction());
  }

  sendStroke(stroke: string) {
    this.store.dispatch(new actions.SendStrokeAction(stroke));
  }
}
