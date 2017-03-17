import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/operator/do';
const DEFAULT_TIMER_TIME = 10;
@Injectable()
export class GameEffects {
  @Effect() startTimer$ = this.actions$
    .ofType('START_TIMER')
    .switchMap((payload) => Observable.of({type: 'TIMER_DECREMENT', payload: { seconds: DEFAULT_TIMER_TIME }}));

  @Effect() countdownTimer$ = this.actions$
    .ofType('TIMER_DECREMENT')
    .map(toPayload)
    .switchMap((payload) => {
      console.log('TIMER_DECREMENT - payload', payload);
      if (payload.seconds > 0) {
        console.log('*** TIMER COUNTDOWN');
        return Observable.timer(1000)
          .switchMap(() => Observable.of({type: 'TIMER_DECREMENT', payload: { seconds: payload.seconds - 1}}));
      } else {
        console.log('*** TIMER DONE');
        return Observable.of({type: 'NEXT_PATTERN'});
      }
    });

  @Effect() triggerTimer = this.actions$
    .ofType('NEXT_PATTERN')
    .map(toPayload)
    .switchMap((payload) => {
      console.dir(payload);
      return Observable.of({type: 'START_TIMER', payload: { seconds: DEFAULT_TIMER_TIME }});
    });

  constructor(private actions$: Actions) {
    console.log('*(@$&(*$&#$ created');
  }
}
