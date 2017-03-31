import { Action } from '@ngrx/store';
import { Rudiment, RUDIMENTS } from '../state-definitions/rudiment';
import { GamePlayLevelScoring, GamePlayState, GameState } from '../state-definitions/game-play-state';
import * as game from '../actions/game-actions';

const initialState: GamePlayState = {
  levelScore: 0,
  totalScore: 0,
  receivedPattern: '',
  displayedPattern: '',
  rudiment: RUDIMENTS[0],
  timeLeft: 0,
  rudimentId: 0,
  gameState: GameState.NOT_STARTED,
  message: '',
  correctMatches: 0,
  rudimentPosition: 0,
  challengeTimeInSeconds: RUDIMENTS[0].challengeTimeInSeconds,
  scoreLog: []
};

export function gamePlayReducer(state = initialState, action: Action): GamePlayState {
  switch (action.type) {
    case game.ActionTypes.BEGIN_GAME:
      if (state.gameState === GameState.NOT_STARTED) {
        return Object.assign({}, state, { gameState: GameState.PLAYING });
      } else {
        return state;
      }
    case game.ActionTypes.RESET_GAME:
      return Object.assign({}, initialState);
    case game.ActionTypes.NEXT_PATTERN:
      const rudimentId = state.rudimentId >= RUDIMENTS.length - 1 ? 0 : state.rudimentId + 1;
      // add to game log
      const scoring = state.scoreLog;
      scoring.push(new GamePlayLevelScoring(RUDIMENTS[rudimentId], rudimentId, state.levelScore));
      return Object.assign({}, state, {
        rudimentId: rudimentId,
        rudiment: RUDIMENTS[rudimentId],
        receivedPattern: '',
        rudimentPosition: 0,
        levelScore: 0,
        correctMatches: 0,
        scoreLog: scoring,
        challengeTimeInSeconds: RUDIMENTS[rudimentId].challengeTimeInSeconds
      });
    case game.ActionTypes.PAUSE:
      return Object.assign({}, state, {
        gameState: GameState.PAUSED,
        timeLeft: 0,
        message: 'Hold on there Bonham...'
      });
    case game.ActionTypes.RESUME:
      return Object.assign({}, state, {paused: false, message: 'Go for it!'});
    case game.ActionTypes.TIMER_DECREMENT:
      return Object.assign({}, state, {timeLeft: action.payload});
    case game.ActionTypes.SEND_STROKE:
      // first, if we're paused, do NOTHING
      if (state.gameState === GameState.PAUSED) {
        return state;
      }

      let updatedPattern = state.receivedPattern + action.payload;
      let rudimentPosition = state.rudimentPosition + 1;
      let displayedPattern = state.rudimentPosition === 0 ? action.payload : state.displayedPattern + action.payload;
      if (rudimentPosition <= (state.rudiment.pattern.length - 1)) {
        displayedPattern = displayedPattern + '-';
      }

      let totalScore: number = state.totalScore;
      let levelScore: number = state.levelScore;
      let correctMatches = state.correctMatches;
      let message = '';
      const match = state.rudiment.pattern.substr(0, rudimentPosition) === updatedPattern;
      const fullMatch = match && state.rudiment.pattern.length === updatedPattern.length;

      // if the pattern is correct so far, score a point
      if (fullMatch) {
        correctMatches = correctMatches + 1;
        message = 'Awesome!!';
        levelScore = state.levelScore + state.rudiment.points;
        totalScore = state.totalScore + state.rudiment.points;
        rudimentPosition = 0;
        updatedPattern = '';
      } else if (match) {
        message = 'Keep going!!!';
        rudimentPosition = state.rudimentPosition + 1;
      } else {  // no match, time to start again!
        message = 'Oops, try again!';
        rudimentPosition = 0;
        updatedPattern = '';
      }

      // build up new state
      const newState: GamePlayState = Object.assign({}, state, {
        receivedPattern: updatedPattern,
        displayedPattern: displayedPattern,
        message: message,
        totalScore: totalScore,
        levelScore: levelScore,
        rudimentPosition: rudimentPosition
      });

      return newState;

    default:
      console.log('unknown action type', action);
      return state;
  }
}
