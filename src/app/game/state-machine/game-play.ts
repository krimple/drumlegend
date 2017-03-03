import { ActionReducer, Action } from '@ngrx/store';

export const SET_PATTERN = 'SET_PATTERN';
export const AWAIT_PLAYER_PATTERN = 'AWAIT_PLAYER_PATTERN';
export const SEND_STROKE = 'SEND_STROKE';
export const SCORE_PATTERN = 'SCORE_PATTERN';
export const GET_SCORE = 'GET_SCORE';
export const RESET_SCORE = 'RESET_SCORE';

export const RUDIMENTS = [
  { name: 'Single-Stroke Roll', visiblePattern: 'RLRLRLRL', pattern: 'RLRLRLRL' },
  { name: 'Double-Stroke Roll', visiblePattern: 'RRLLRRLL', pattern: 'RRLLRRLL' },
  { name: 'Paradiddle', visiblePattern: 'RLRR LRLL', pattern: 'RLRRLRLL' },
  { name: 'Paradiddle-diddle', visiblePattern: 'RLRRLL LRLLRR', pattern: 'RLRRLLLRLLRR' },
  { name: 'Double Paraddidle', visiblePattern: 'RLRLRR LRLRLL', pattern: 'RLRLRRLRLRLL' },
  { name: 'Three Stroke Roll', visiblePattern: 'RRL LLR', pattern: 'RRLLLR' },
  { name: 'Five Stroke Roll', visiblePattern: 'RRLLR LLRRL', pattern: 'RRLLRLLRRL' },
  { name: 'Six Stroke Roll', visiblePattern: 'RRLLRL LLRRLR', pattern: 'RRLLRLLLRRLR' }
];

const initialState = {
  currentScore: 0,
  receivedPattern: '',
  pattern: RUDIMENTS[0],
  patternId: 0,
  tries: 0,
  message: ''
};

export function gamePlayReducer(state = initialState, action: Action) {
  switch (action.type) {
    case SET_PATTERN:
      return Object.assign({}, state, { pattern: action.payload.pattern});
    case SEND_STROKE:
      // TODO ugly, consider refactor?
      let updatedPattern = state.receivedPattern + action.payload.stroke;
      let pattern = state.pattern;
      let patternId = state.patternId;
      let newScore: number = state.currentScore;
      let message = '';
      let tries = state.tries;
      if (state.pattern.pattern.length === updatedPattern.length) {
        if (state.pattern.pattern === updatedPattern) {
          newScore = state.currentScore + 1;
          updatedPattern = '';
          message = 'A match! Good job!';
          // TODO - extract this and flag when game is over
          patternId = state.patternId >= RUDIMENTS.length - 1 ? 0 : state.patternId + 1;
          pattern = RUDIMENTS[patternId];
        } else {
          updatedPattern = '';
          tries = tries + 1;
          if (tries > 2) {
            pattern = RUDIMENTS[patternId];
            // TODO - extract this and flag when game is over
            patternId = state.patternId >= RUDIMENTS.length ? 0 : state.patternId + 1;
            message = 'Try another pattern...';
          } else {
            message = 'Wrong! Try again!';
          }
        }
      } else {
        // clear message if still here
          message = '';
      }
      // build up new state
      return Object.assign({}, state, {
          pattern: {
            pattern: pattern.pattern,
            name: pattern.name
          },
          patternId: patternId,
          tries: tries,
          receivedPattern: updatedPattern,
          message: message,
          currentScore: newScore
      });

    default:
      return state;
  }
}
