import {ActionReducer, Action} from '@ngrx/store';
import {Rudiment} from './rudiment';
import {GamePlayState} from './game-play-state';

export const SET_PATTERN = 'SET_PATTERN';
export const AWAIT_PLAYER_PATTERN = 'AWAIT_PLAYER_PATTERN';
export const SEND_STROKE = 'SEND_STROKE';
export const SCORE_PATTERN = 'SCORE_PATTERN';
export const GET_SCORE = 'GET_SCORE';
export const RESET_GAME = 'RESET_GAME';
export const PAUSE = 'PAUSE';
export const RESUME = 'RESUME';

export const RUDIMENTS: Rudiment[] = [
  {
    name          : 'Single-Stroke Roll',
    description   : 'Alternating strokes from right to left',
    visiblePattern: 'R-L-R-L R-L-R-L',
    pattern       : 'RLRLRLRL'
  },
  {
    name          : 'Double-Stroke Roll',
    description   : 'Use the bounce of the stick to tap twice on each hand, useful for fast rolls',
    visiblePattern: 'R-R-L-L R-R-L-L',
    pattern       : 'RRLLRRLL'
  },
  {
    name          : 'Paradiddle',
    description   : 'This rudiment allows for switching of the leading hand every four beats and is essential in rock, R&B and funk music.',
    visiblePattern: 'R-L-R-R L-R-L-L',
    pattern       : 'RLRRLRLL'
  },
  {
    name          : 'Paradiddle-diddle',
    description   : 'This is a variation of the paradiddle that allows for rapid rhythm ' +
    'patterns in a triplet beat. Used in Jazz ride patterns and much more.',
    visiblePattern: 'R-L-R-R-L-L L-R-L-L-R-R',
    pattern       : 'RLRRLLLRLLRR'
  },
  {
    name          : 'Double Paraddidle',
    description   : 'A paradiddle rhythm in three parts, this is often used to flip the leading hands in a drum rudiment',
    visiblePattern: 'R-L-R-L-R-R L-R-L-R-L-L',
    pattern       : 'RLRLRRLRLRLL'
  },
  {
    name          : 'Three Stroke Roll',
    description   : 'This roll is often used to stop a rhythmic statement and also to provide a non-hand-switching ' +
    'rudiment for repeated play.  Try it leading from both hands.',
    visiblePattern: 'R-R-L L-L-R',
    pattern       : 'RRLLLR'
  },
  {
    name          : 'Five Stroke Roll',
    visiblePattern: 'R-R-L-L-R L-L-R-R-L',
    description   : 'A rhythmic rudiment in 5, each five stroke roll switches the leading hand. ' +
    'Often fit into a single beat like a quarter note.',
    pattern       : 'RRLLRLLRRL'
  },
  {
    name          : 'Six Stroke Roll',
    visiblePattern: 'R-R-L-L-R-L L-L-R-R-L-R',
    description   : 'six notes that can be repeatedly played with the same leading hand. The inverse of the paradiddle-diddle',
    pattern       : 'RRLLRLLLRRLR'
  }
];

console.dir(RUDIMENTS);

const initialState: GamePlayState = {
  currentScore   : 0,
  receivedPattern: '',
  paused         : false,
  rudiment       : RUDIMENTS[0],
  rudimentId     : 0,
  tries          : 0,
  message        : '',
  rudimentPosition: 0
};

export function gamePlayReducer(state = initialState, action: Action) {
  switch (action.type) {
    case RESET_GAME:
      return Object.assign({}, initialState);
    case SET_PATTERN:
      return Object.assign({}, state, {pattern: action.payload.rudiment});
    case PAUSE:
      return Object.assign({}, state, {paused: true, message: 'Hold on there Bonham...'});
    case RESUME:
      return Object.assign({}, state, {paused: false, message: 'Go for it!'});
    case SEND_STROKE:
      // first, if we're paused, do NOTHING
      if (state.paused === true) {
        return state;
      }
      let updatedPattern = state.receivedPattern + action.payload.stroke;
      let rudiment = state.rudiment;
      let rudimentId = state.rudimentId;
      let rudimentPosition = state.rudimentPosition + 1;
      let score: number = state.currentScore;
      let message = '';
      let pause = false;
      let tries = state.tries;
      const match = state.rudiment.pattern.substr(0, rudimentPosition) === updatedPattern;
      // if the pattern is correct so far, score a point
      if (match) {
        score = score + 1;
        message = 'A match! Good job!';
        rudimentPosition = state.rudimentPosition + 1;
      } else {
        message = 'oops!';
      }


      // have we reached the rudiment text length, or did they fail to match? If so, reset
      if (state.rudiment.pattern.length === updatedPattern.length || match === false) {
        tries = tries + 1;
        rudimentPosition = 0;
        updatedPattern = '';
        pause = true;
        if (tries > 2) {
          rudimentId = state.rudimentId >= RUDIMENTS.length - 1 ? 0 : state.rudimentId + 1;
          rudiment = RUDIMENTS[rudimentId];
          tries = 0;
        }
      }

      // build up new state
      const newState: GamePlayState = Object.assign({}, state, {
        rudiment       : rudiment,
        pause          : pause,
        rudimentId     : rudimentId,
        tries          : tries,
        receivedPattern: updatedPattern,
        message        : message,
        currentScore   : score,
        rudimentPosition: rudimentPosition
      });
      console.log(JSON.stringify(newState));
      return newState;

    default:
      return state;
  }
}
