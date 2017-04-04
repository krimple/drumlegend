import { Effect, Actions, toPayload } from '@ngrx/effects';
import * as actions from '../actions/game-actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/do';
import { Store } from '@ngrx/store';
import { GamePlayState, GameState } from '../state-definitions/game-play-state';

const TICK = 3000;

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
    console.log(`this is ${this}`);
    return this.actions$
      .ofType(actions.ActionTypes.NEXT_PATTERN)
      .withLatestFrom(self.store, (action, state: any) => {
        console.dir(`Game State ${state.gamePlay.gameState}, rudiment: ${state.gamePlay.rudimentId}`);
        return state; // {  challengeTime: state.gamePlay.rudiment ? state.gamePlay.rudiment.challengeTimeInSeconds : 10};
      })
      .switchMap((state) => {
        if (state.gamePlay.rudimentId === -1 && state.gamePlay.gameState === GameState.PLAYING) {
          return Observable.of(new actions.EndGameAction());
        } else {
          return Observable.of(new actions.TimerDecrementAction(state.gamePlay.challengeTimeInSeconds));
        }
      });
  };

  constructor(private actions$: Actions, private store: Store<GamePlayState>) { }

}
