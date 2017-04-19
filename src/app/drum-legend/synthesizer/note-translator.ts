export class NoteTranslator {
  static notes = [
    {noteNames: ['C0'], frequency: 16.3516},
    {noteNames: ['C#0', 'Db0'], frequency: 17.3239},
    {noteNames: ['D0'], frequency: 18.3540},
    {noteNames: ['D#0', 'Eb0'], frequency: 19.4454},
    {noteNames: ['E0'], frequency: 20.6017},
    {noteNames: ['F0'], frequency: 21.8268},
    {noteNames: ['F#0', 'Gb0'], frequency: 23.1247},
    {noteNames: ['G0'], frequency: 24.4997},
    {noteNames: ['G#0', 'Ab0'], frequency: 25.9565},
    {noteNames: ['A0'], frequency: 27.5000},
    {noteNames: ['A#0', 'Bb0'], frequency: 29.1352},
    {noteNames: ['B0'], frequency: 30.8677},
    {noteNames: ['C1'], frequency: 32.7032},
    {noteNames: ['C#1', 'Db1'], frequency: 34.6478},
    {noteNames: ['D1'], frequency: 36.7081},
    {noteNames: ['D#1', 'Eb1'], frequency: 38.8909},
    {noteNames: ['E1'], frequency: 41.2034},
    {noteNames: ['F1'], frequency: 43.6535},
    {noteNames: ['F#1', 'Gb1'], frequency: 46.25},
    {noteNames: ['G1'], frequency: 48.8884},
    {noteNames: ['G#1', 'Ab1'], frequency: 51.9131},
    {noteNames: ['A1'], frequency: 55.00},
    {noteNames: ['A#1', 'Bb1'], frequency: 58.2705},
    {noteNames: ['B1'], frequency: 61.7354},
    {noteNames: ['C2'], frequency: 65.4064},
    {noteNames: ['C#2', 'Db2'], frequency: 69.2957},
    {noteNames: ['D2'], frequency: 73.4162},
    {noteNames: ['D#2', 'Eb2'], frequency: 77.7817},
    {noteNames: ['E2'], frequency: 82.4069},
    {noteNames: ['F2'], frequency: 87.3071},
    {noteNames: ['F#2', 'Gb2'], frequency: 92.4986},
    {noteNames: ['G2'], frequency: 97.9989},
    {noteNames: ['G#2', 'Ab2'], frequency: 103.826},
    {noteNames: ['A2'], frequency: 110.00},
    {noteNames: ['A#2', 'Bb2'], frequency: 116.541},
    {noteNames: ['B2'], frequency: 123.471},
    {noteNames: ['C3'], frequency: 130.813},
    {noteNames: ['C#3', 'Db3'], frequency: 138.591},
    {noteNames: ['D3'], frequency: 146.832},
    {noteNames: ['D#3', 'Eb3'], frequency: 155.563},
    {noteNames: ['E3'], frequency: 164.814},
    {noteNames: ['F3'], frequency: 174.614},
    {noteNames: ['F#3', 'Gb3'], frequency: 184.997},
    {noteNames: ['G3'], frequency: 195.998},
    {noteNames: ['G#3', 'Ab3'], frequency: 207.652},
    {noteNames: ['A3'], frequency: 220.00},
    {noteNames: ['A#3', 'Bb3'], frequency: 233.082},
    {noteNames: ['B3'], frequency: 246.942},
    {noteNames: ['C4'], frequency: 261.626},
    {noteNames: ['C#4', 'Db4'], frequency: 277.183},
    {noteNames: ['D4'], frequency: 293.665},
    {noteNames: ['D#4', 'Eb4'], frequency: 311.127},
    {noteNames: ['E4'], frequency: 329.628},
    {noteNames: ['F4'], frequency: 349.228},
    {noteNames: ['F#4', 'Gb4'], frequency: 369.994},
    {noteNames: ['G4'], frequency: 391.995},
    {noteNames: ['G#4', 'Ab4'], frequency: 415.305},
    {noteNames: ['A4'], frequency: 440.00},
    {noteNames: ['A#4', 'Bb4'], frequency: 466.164},
    {noteNames: ['B4'], frequency: 493.883},
    {noteNames: ['C5'], frequency: 523.251},
    {noteNames: ['C#5', 'Db5'], frequency: 554.365},
    {noteNames: ['D5'], frequency: 587.330},
    {noteNames: ['D#5', 'Eb5'], frequency: 622.254},
    {noteNames: ['E5'], frequency: 659.255},
    {noteNames: ['F5'], frequency: 698.456},
    {noteNames: ['F#5', 'Gb5'], frequency: 739.989},
    {noteNames: ['G5'], frequency: 783.991},
    {noteNames: ['G#5', 'Ab5'], frequency: 830.609},
    {noteNames: ['A5'], frequency: 880.00},
    {noteNames: ['A#5', 'Bb5'], frequency: 932.328},
    {noteNames: ['B5'], frequency: 987.767},
    {noteNames: ['C6'], frequency: 1046.50},
    {noteNames: ['C#6', 'Db6'], frequency: 1108.73},
    {noteNames: ['D6'], frequency: 1174.66},
    {noteNames: ['D#6', 'Eb6'], frequency: 1244.51},
    {noteNames: ['E6'], frequency: 1318.51},
    {noteNames: ['F6'], frequency: 1396.91},
    {noteNames: ['F#6', 'Gb6'], frequency: 1479.98},
    {noteNames: ['G6'], frequency: 1567.98},
    {noteNames: ['G#6', 'Ab6'], frequency: 1661.22},
    {noteNames: ['A6'], frequency: 1760.00},
    {noteNames: ['A#6', 'Bb6'], frequency: 1864.66},
    {noteNames: ['B6'], frequency: 1975.53},
    {noteNames: ['C7'], frequency: 2093.00},
    {noteNames: ['C#7', 'Db7'], frequency: 2217.46},
    {noteNames: ['D7'], frequency: 2349.32},
    {noteNames: ['D#7', 'Eb7'], frequency: 2489.02},
    {noteNames: ['E7'], frequency: 2637.02},
    {noteNames: ['F7'], frequency: 2793.83},
    {noteNames: ['F#7', 'Gb7'], frequency: 2959.96},
    {noteNames: ['G7'], frequency: 3135.96},
    {noteNames: ['G#7', 'Ab7'], frequency: 3322.44},
    {noteNames: ['A7'], frequency: 3520.00},
    {noteNames: ['A#7', 'Bb7'], frequency: 3729.31},
    {noteNames: ['B7'], frequency: 3951.07},
    {noteNames: ['C8'], frequency: 4186.01},
    {noteNames: ['C#8', 'Db8'], frequency: 4434.92},
    {noteNames: ['D8'], frequency: 4698.64},
    {noteNames: ['D#8', 'Eb8'], frequency: 4978.03},
    {noteNames: ['E8'], frequency: 5274.041},
    {noteNames: ['F8'], frequency: 5587.652}
  ];

  static translateKeyNumberToNoteFrequency(keyNumber: number) {
    if (typeof keyNumber === 'number') {
      return NoteTranslator.notes[keyNumber].frequency;
    } else {
      return 0;
    }
  }

  static translateKeyNumberToFirstNoteName(keyNumber: number) {
    if (typeof keyNumber === 'number') {
      return NoteTranslator.notes[keyNumber].noteNames[0];
    } else {
      return '';
    }
  }

  static translateKeyNumberToNoteNames(keyNumber: number) {
    if (typeof keyNumber === 'number') {
      return NoteTranslator.notes[keyNumber].noteNames;
    } else {
      return [];
    }
  }
}
