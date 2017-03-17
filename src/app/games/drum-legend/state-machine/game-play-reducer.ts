import {ActionReducer, Action} from '@ngrx/store';
import {Rudiment} from './rudiment';
import {GamePlayState} from './game-play-state';

export const NEXT_PATTERN = 'SET_PATTERN';
export const AWAIT_PLAYER_PATTERN = 'AWAIT_PLAYER_PATTERN';
export const SEND_STROKE = 'SEND_STROKE';
export const SCORE_PATTERN = 'SCORE_PATTERN';
export const GET_SCORE = 'GET_SCORE';
export const RESET_GAME = 'RESET_GAME';
export const CONTINUE = 'CONTINUE';
export const PAUSE = 'PAUSE';
export const RESUME = 'RESUME';
export const DECREMENT_TIME_IN_SECONDS = 'DECREMENT_TIME_IN_SECONDS';

export const RUDIMENTS: Rudiment[] = [
    {
        name          : 'Single-Stroke Roll',
        description   : 'Alternating strokes from right to left',
        visiblePattern: 'R-L-R-L R-L-R-L',
        pattern       : 'RLRLRLRL',
        points:  50
    },
    {
        name          : 'Double-Stroke Roll',
        description   : 'Use the bounce of the stick to tap twice on each hand, useful for fast rolls',
        visiblePattern: 'R-R-L-L R-R-L-L',
        pattern       : 'RRLLRRLL',
        points   : 100
    },
    {
        name          : 'Paradiddle',
        description   : 'This rudiment allows for switching of the leading hand every ' +
        ' four beats and is essential in rock, R&B and funk music.',
        visiblePattern: 'R-L-R-R L-R-L-L',
        pattern       : 'RLRRLRLL',
        points   : 200
    },
    {
        name          : 'Paradiddle-diddle - Right Hand',
        description   : 'This is a variation of the paradiddle that allows for rapid rhythm ' +
            'patterns in a triplet beat. Used in Jazz ride patterns and much more.',
        visiblePattern: 'R-L-R-R-L-L L-R-L-L-R-R',
        pattern       : 'RLRRLLLRLLRR',
        points   : 300
    },
    {
        name          : 'Paradiddle-diddle - Left Hand',
        description   : 'This is a variation of the paradiddle that allows for rapid rhythm ' +
            'patterns in a triplet beat. Used in Jazz ride patterns and much more.',
        visiblePattern: 'L-R-L-L-R-R',
        pattern       : 'LRLLRR',
        points   : 300
    },
    {
        name          : 'Double Paraddidle',
        description   : 'A paradiddle rhythm in three parts, this is often used to flip the leading hands in a drum rudiment',
        visiblePattern: 'R-L-R-L-R-R L-R-L-R-L-L',
        pattern       : 'LRLRLL',
        points   : 400
    },
    {
        name          : 'Triple Paraddidle',
        description   : 'A paradiddle rhythm in three parts, this is often used to flip the leading hands in a drum rudiment',
        visiblePattern: 'R-L-R-L-R-L-R-R L-R-L-R-L-R-L-L',
        pattern       : 'RLRLRLRRLRLRLRLL',
        points   : 400
    },
    {
        name          : 'Three Stroke Roll - Right Hand',
        description   : 'This roll is often used to stop a rhythmic statement and also to provide a non-hand-switching ' +
            'rudiment for repeated play.  Try it leading from both hands.',
        visiblePattern: 'R-R-L',
        pattern       : 'RRL',
        points   : 400
    },
    {
        name          : 'Three Stroke Roll - Left Hand',
        description   : 'This roll is often used to stop a rhythmic statement and also to provide a non-hand-switching ' +
            'rudiment for repeated play.',
        visiblePattern: 'L-L-R',
        pattern       : 'LLR',
        points   : 400
    },
    {
        name          : 'Five Stroke Roll',
        visiblePattern: 'R-R-L-L-R L-L-R-R-L',
        description   : 'A rhythmic rudiment in 5, each five stroke roll switches the leading hand. ' +
            'Often fit into a single beat like a quarter note.',
        pattern       : 'RRLLRLLRRL',
        points   : 1000
    },
    {
        name          : 'Six Stroke Roll - Right Hand',
        visiblePattern: 'R-R-L-L-R-L',
        description   : 'Six notes that can be repeatedly played with the same leading hand. The inverse of the paradiddle-diddle',
        pattern       : 'RRLLRL',
        points   : 1200
    },
    {
        name          : 'Six Stroke Roll - Left Hand',
        visiblePattern: 'L-L-R-R-L-R',
        description   : 'six notes that can be repeatedly played with the same leading hand. The inverse of the paradiddle-diddle',
        pattern       : 'LLRRLR',
        points   : 1200
    }
];

console.dir(RUDIMENTS);

const initialState: GamePlayState = {
    timeLeft       : 60,
    currentScore   : 0,
    receivedPattern: '',
    rudiment       : RUDIMENTS[0],
    rudimentId     : 0,
    message        : '',
    paused         : true,
    correctMatches: 0,
    rudimentPosition: 0,
    scoreLog: []
};

export function gamePlayReducer(state = initialState, action: Action) {
    switch (action.type) {
        case CONTINUE:
            return Object.assign({}, state, { timeLeft: action.payload.timeLeft });
        case DECREMENT_TIME_IN_SECONDS:
            return Object.assign({}, state, { action.payload.tick });
        case RESET_GAME:
            return Object.assign({}, initialState);
        case NEXT_PATTERN:
            const rudimentId = state.rudimentId >= RUDIMENTS.length - 1 ? 0 : state.rudimentId + 1;
            // add to game log
            let scoring = state.scoreLog;
            scoring.push({ rudiment: state.rudiment,
                           matches: correctMatches,
                           totalScore: state.score + score });
             return Object.assign({}, state, {rudimentId:  rudimentId,
                                             rudiment: RUDIMENTS[rudimentId],
                                             scoreLog: scoring });
        case PAUSE:
            return Object.assign({}, state, {paused: true, timeLeft: 0, message: 'Hold on there Bonham...'});
        case RESUME:
            return Object.assign({}, state, {paused: false, message: 'Go for it!'});
        case SEND_STROKE:
            // first, if we're paused, do NOTHING
            if (state.paused === true) {
              return state;
            }
        const updatedPattern = state.receivedPattern + action.payload.stroke;
        let rudimentPosition = state.rudimentPosition + 1;
        let score: number = state.currentScore;
        let correctMatches = state.correctMatches;
        let message = '';
        const match = state.rudiment.pattern.substr(0, rudimentPosition) === updatedPattern;
        const fullMatch = match && state.rudiment.pattern.length === updatedPattern.length;

        // if the pattern is correct so far, score a point
        if (fullMatch) {
            correctMatches = correctMatches + 1;
            message = 'Awesome!!';
            score = state.currentScore + state.rudiment.points;
           rudimentPosition = 0;
        } else if (match) {
            message = 'Keep going!!!';
            rudimentPosition = state.rudimentPosition + 1;
        } else {  // no match, time to start again!
            message = 'Oops, try again!';
            rudimentPosition = 0;
        }

        // build up new state
        const newState: GamePlayState = Object.assign({}, state, {
            rudimentId     : rudimentId,
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
