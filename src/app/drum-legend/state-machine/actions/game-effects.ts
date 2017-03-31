import { Effect, Actions, toPayload } from '@ngrx/effects';
import * as actions from '../actions/game-actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/do';
const DEFAULT_TIMER_TIME = 10;
@Injectable()
export class GameEffects {
  @Effect() startTimer$ =
    this.actions$
      .ofType(actions.ActionTypes.START_TIMER)
      .map(action => new actions.TimerDecrementAction(action.payload));
  @Effect() countdownTimer$ =
    this.actions$
      .ofType(actions.ActionTypes.TIMER_DECREMENT)
      .map(toPayload)
      .switchMap((payload: number) => {
        if (payload > 0) {
          return Observable.timer(1000)
            .map(() => new actions.TimerDecrementAction(payload - 1));
        } else {
          return Observable.of(new actions.NextPatternAction());
        }
      });

  @Effect() triggerTimer = this.actions$
    .ofType(actions.ActionTypes.NEXT_PATTERN)
    .map(toPayload)
    .switchMap((payload: number) => {
      return Observable.of(new actions.StartTimerAction(DEFAULT_TIMER_TIME));
    });

  constructor(private actions$: Actions) { }
}
