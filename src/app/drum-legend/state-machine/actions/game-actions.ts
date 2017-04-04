import { Action } from '@ngrx/store';

export const ActionTypes = {
  BEGIN_GAME: 'BEGIN_GAME',
  END_GAME: 'END_GAME',
  NEXT_PATTERN : 'NEXT_PATTERN',
  AWAIT_PLAYER_PATTERN : 'AWAIT_PLAYER_PATTERN',
  SEND_STROKE : 'SEND_STROKE',
  START_TIMER : 'START_TIMER',
  SCORE_PATTERN : 'SCORE_PATTERN',
  GET_SCORE : 'GET_SCORE',
  RESET_GAME : 'RESET_GAME',
  CONTINUE : 'CONTINUE',
  PAUSE : 'PAUSE',
  RESUME : 'RESUME',
  TIMER_DECREMENT: 'TIMER_DECREMENT',
  DECREMENT_TIME_IN_SECONDS : 'DECREMENT_TIME_IN_SECONDS'
};

export class BeginGameAction implements Action {
  type = ActionTypes.BEGIN_GAME;
}

export class NextPatternAction implements Action {
  type = ActionTypes.NEXT_PATTERN;
}

export class StartTimerAction implements Action {
  type = ActionTypes.START_TIMER;
  constructor(public payload: number) { }
}

export class AwaitPlayerPatternAction implements Action {
  type = ActionTypes.AWAIT_PLAYER_PATTERN;
}

export class SendStrokeAction implements Action {
  type = ActionTypes.SEND_STROKE;
  constructor(public payload: string) { }
}

export class ScorePatternAction implements Action {
  type = ActionTypes.SCORE_PATTERN;
}

export class GetScoreAction implements Action {
  type = ActionTypes.GET_SCORE;
}

export class ResetGameAction implements Action {
  type = ActionTypes.RESET_GAME;
}

export class ContinueAction implements Action {
  type = ActionTypes.CONTINUE;
}

export class PauseAction implements Action {
  type = ActionTypes.PAUSE;
}

export class ResumeAction implements Action {
  type = ActionTypes.RESUME;
}

export class DecrementTimeInSecondsAction implements Action {
  type = ActionTypes.DECREMENT_TIME_IN_SECONDS;
}

export class TimerDecrementAction implements Action {
  type = ActionTypes.TIMER_DECREMENT;
  constructor(public payload: number) { }
}

export class EndGameAction implements Action {
  type = ActionTypes.END_GAME;
}
export type Actions = BeginGameAction
                      | EndGameAction
                      | NextPatternAction
                      | StartTimerAction
                      | AwaitPlayerPatternAction
                      | SendStrokeAction
                      | ScorePatternAction
                      | GetScoreAction
                      | ResetGameAction
                      | ContinueAction
                      | PauseAction
                      | ResumeAction
                      | DecrementTimeInSecondsAction;
