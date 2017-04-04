import { Action } from '@ngrx/store';
import { Rudiment, RUDIMENTS } from '../state-definitions/rudiment';
import { GamePlayLevelScoring, GamePlayState, GameState } from '../state-definitions/game-play-state';
import * as game from '../actions/game-actions';

const initialState: GamePlayState = {
  levelScore: 0,
  totalScore: 0,
  receivedPattern: '',
  displayedPattern: '',
  rudiment: null,
  timeLeft: 0,
  rudimentId: -1,
  gameState: GameState.NOT_STARTED,
  message: '',
  matches: 0,
  rudimentPosition: 0,
  challengeTimeInSeconds: RUDIMENTS[0].challengeTimeInSeconds,
  scoreLog: []
};



export function gamePlayReducer(state = initialState, action: Action): GamePlayState {
  console.log(`action type: ${action.type}`);
  switch (action.type) {
    case game.ActionTypes.RESET_GAME:
      return processBeginGame();
    case game.ActionTypes.BEGIN_GAME:
      return processBeginGame();
    case game.ActionTypes.END_GAME:
      return Object.assign({}, state, { gameState: GameState.FINAL_SCORE });
    case game.ActionTypes.SCORE_PATTERN:
      return processScorePattern(state);
     case game.ActionTypes.NEXT_PATTERN:
      return processNextPattern(state);
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
      return processSendStroke(state, action);
   default:
      console.log('unknown action type', action);
      return state;
  }
}

function processBeginGame() {
    return Object.assign({}, initialState, { gameState: GameState.PLAYING } );
}

function processScorePattern(state) {
  const rudimentId = state.rudimentId;
  if (rudimentId < 0) {
    return state;
  }
  const scoring = state.scoreLog;
  const newScore = new GamePlayLevelScoring(RUDIMENTS[rudimentId], state.matches, state.levelScore, state.totalScore);
  const newScoringLog = Array.of(...state.scoreLog, newScore);
  return Object.assign({}, state, { scoreLog: newScoringLog});
}

function processNextPattern(state) {
  const rudimentId = state.rudimentId >= RUDIMENTS.length - 1 ? -1 : state.rudimentId + 1;
  const rudiment = rudimentId === -1 ? null : RUDIMENTS[rudimentId];
  // add to game log
  const scoring = state.scoreLog;
  const challengeTimeInSeconds = rudimentId === -1 ? 0 : RUDIMENTS[rudimentId].challengeTimeInSeconds;
  return Object.assign({}, state, {
    rudimentId: rudimentId,
    rudiment: rudiment,
    receivedPattern: '',
    rudimentPosition: 0,
    levelScore: 0,
    matches: 0,
    challengeTimeInSeconds: challengeTimeInSeconds,
    timeLeft: challengeTimeInSeconds
  });
}

function processSendStroke(state, action) {
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
  let matches = state.matches;
  let message = '';
  const match = state.rudiment.pattern.substr(0, rudimentPosition) === updatedPattern;
  const fullMatch = match && state.rudiment.pattern.length === updatedPattern.length;

  // if the pattern is correct so far, score a point
  if (fullMatch) {
    matches = matches + 1;
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
    rudimentPosition: rudimentPosition,
    matches: matches
  });

  return newState;
}


