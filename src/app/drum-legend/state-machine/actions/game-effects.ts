import { Effect, Actions, toPayload } from '@ngrx/effects';
import * as actions from '../actions/game-actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/do';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import { Store } from '@ngrx/store';
import { GamePlayState, GameState } from '../state-definitions/game-play-state';

const TICK = 1000;

@Injectable()
export class GameEffects {
  @Effect() resetGame$ = this.actions$
    .ofType(actions.ActionTypes.RESET_GAME)
    .switchMap(() => Observable.concat([
      new actions.BeginGameAction()
    ]));

  @Effect() nextPatternOnStart$ = this.actions$
    .ofType(actions.ActionTypes.BEGIN_GAME)
    .switchMap(() => {
      return Observable.of(new actions.NextPatternAction());
    });

  @Effect() startTimer$ = this.actions$
    .ofType(actions.ActionTypes.START_TIMER)
    .map(toPayload)
    .switchMap((payload: number) => {
      return Observable.of(new actions.TimerDecrementAction(payload));
    });

  @Effect() countdownTimer$ =
    this.actions$
      .ofType(actions.ActionTypes.TIMER_DECREMENT)
      .map(toPayload)
      .switchMap((payload) => {
        if (payload > 0) {
          return Observable.timer(TICK)
            .map(() => new actions.TimerDecrementAction(payload - 1));
        } else {
          return Observable.concat([
            new actions.ScorePatternAction(),
            new actions.NextPatternAction()
          ]);
        }
      });

  @Effect() triggerTimer$ = () => {
    const self = this;
    return this.actions$
      .ofType(actions.ActionTypes.NEXT_PATTERN)
      .withLatestFrom(self.store, (action, state: any) => {
        return state; // {  challengeTime: state.gamePlay.rudiment ? state.gamePlay.rudiment.challengeTimeInSeconds : 10};
      })
      .switchMap((state) => {
        if (state.gamePlay.rudimentId === -1 && state.gamePlay.gameState === GameState.PLAYING) {
          return Observable.of(new actions.EndGameAction());
        } else {
          return Observable.of(new actions.StartTimerAction(state.gamePlay.challengeTimeInSeconds));
        }
      });
  };

  constructor(private actions$: Actions, private store: Store<GamePlayState>) { }

}
