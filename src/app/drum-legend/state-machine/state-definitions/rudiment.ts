export class Rudiment {
  name: string;
  description: string;
  visiblePattern: string;
  pattern: string;
  points: number;
  challengeTimeInSeconds: number;
}

export const DEFAULT_CHALLENGE_TIME = 2;

export const RUDIMENTS: Rudiment[] = [
  {
    name: 'Single-Stroke Roll',
    description: 'Alternating strokes from right to left',
    visiblePattern: 'R-L-R-L R-L-R-L',
    pattern: 'RLRLRLRL',
    challengeTimeInSeconds: DEFAULT_CHALLENGE_TIME,
    points: 50
  },
  {
    name: 'Double-Stroke Roll',
    description: 'Use the bounce of the stick to tap twice on each hand, useful for fast rolls',
    visiblePattern: 'R-R-L-L R-R-L-L',
    pattern: 'RRLLRRLL',
    challengeTimeInSeconds: DEFAULT_CHALLENGE_TIME,
    points: 100
  },
  {
    name: 'Paradiddle',
    description: 'This rudiment allows for switching of the leading hand every ' +
    ' four beats and is essential in rock, R&B and funk music.',
    visiblePattern: 'R-L-R-R L-R-L-L',
    pattern: 'RLRRLRLL',
    challengeTimeInSeconds: DEFAULT_CHALLENGE_TIME,
    points: 200
  },
 {
    name: 'Paradiddle-diddle - Right Hand',
    description: 'This is a variation of the paradiddle that allows for rapid rhythm ' +
    'patterns in a triplet beat. It does not switch hands after each sequence.  ' +
    'Used in Jazz ride patterns and much more.',
    visiblePattern: 'R-L-R-R-L-L',
    pattern: 'RLRRLL',
    challengeTimeInSeconds: DEFAULT_CHALLENGE_TIME,
    points: 300
  },
  {
    name: 'Paradiddle-diddle - Left Hand',
    description: 'This is a variation of the paradiddle that allows for rapid rhythm ' +
    'patterns in a triplet beat. It does not switch hands after each sequence.  ' +
    'Used in Jazz ride patterns and much more.',
    visiblePattern: 'L-R-L-L-R-R',
    pattern: 'LRLLRR',
    challengeTimeInSeconds: DEFAULT_CHALLENGE_TIME,
    points: 300
  },
  {
    name: 'Double Paraddidle',
    description: 'A paradiddle rhythm in three parts, this is often used to flip the leading hands in a drum rudiment',
    visiblePattern: 'R-L-R-L-R-R L-R-L-R-L-L',
    pattern: 'RLRLRRLRLRLL',
    challengeTimeInSeconds: DEFAULT_CHALLENGE_TIME,
    points: 400
  },
  {
    name: 'Triple Paraddidle',
    description: 'A paradiddle rhythm in three parts, this is often used to flip the leading hands in a drum rudiment',
    visiblePattern: 'R-L-R-L-R-L-R-R L-R-L-R-L-R-L-L',
    pattern: 'RLRLRLRRLRLRLRLL',
    challengeTimeInSeconds: DEFAULT_CHALLENGE_TIME,
    points: 400
  },
  {
    name: 'Three Stroke Roll - Right Hand',
    description: 'This roll is often used to stop a rhythmic statement and also to provide a non-hand-switching ' +
    'rudiment for repeated play.  Try it leading from both hands.',
    visiblePattern: 'R-R-L',
    pattern: 'RRL',
    challengeTimeInSeconds: DEFAULT_CHALLENGE_TIME,
    points: 400
  },
  {
    name: 'Three Stroke Roll - Left Hand',
    description: 'This roll is often used to stop a rhythmic statement and also to provide a non-hand-switching ' +
    'rudiment for repeated play.',
    visiblePattern: 'L-L-R',
    pattern: 'LLR',
    challengeTimeInSeconds: DEFAULT_CHALLENGE_TIME,
    points: 400
  },
  {
    name: 'Five Stroke Roll',
    visiblePattern: 'R-R-L-L-R L-L-R-R-L',
    description: 'A rhythmic rudiment in 5, each five stroke roll switches the leading hand. ' +
    'Often fit into a single beat like a quarter note.',
    pattern: 'RRLLRLLRRL',
    challengeTimeInSeconds: DEFAULT_CHALLENGE_TIME,
    points: 1000
  },
  {
    name: 'Six Stroke Roll - Right Hand',
    visiblePattern: 'R-R-L-L-R-L',
    description: 'Six notes that can be repeatedly played with the same leading hand. The inverse of the paradiddle-diddle',
    pattern: 'RRLLRL',
    challengeTimeInSeconds: DEFAULT_CHALLENGE_TIME,
    points: 1200
  },
  {
    name: 'Six Stroke Roll - Left Hand',
    visiblePattern: 'L-L-R-R-L-R',
    description: 'six notes that can be repeatedly played with the same leading hand. The inverse of the paradiddle-diddle',
    pattern: 'LLRRLR',
    challengeTimeInSeconds: DEFAULT_CHALLENGE_TIME,
    points: 1200
  }
];
