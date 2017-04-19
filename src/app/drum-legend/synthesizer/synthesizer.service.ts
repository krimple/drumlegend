import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as Tone from 'tone';

@Injectable()
export class SynthesizerService {
  synth: any;
  vibrato: any;
  reverb: any;
  limiter: any;
  gain: any;

  constructor() {
  }

  // makes testing easier...
  init() {
    this.reverb = new Tone.JCReverb(0.6).connect(Tone.Master);
    this.vibrato = new Tone.Vibrato(5, 0);
    this.gain = new Tone.Gain(1);
    this.limiter = new Tone.Limiter(1);
    this.synth = new Tone.PolySynth(8, Tone.AMSynth)
      .chain(this.vibrato, this.reverb, this.gain, this.limiter, Tone.Master);
  }

  playNote(note: string, velocity: number) {
    this.synth.triggerAttack(note, 0, 0.7 + (velocity / 127) * 0.3);
  }

  stopNote(note: string) {
    this.synth.triggerRelease(note);
  }

  detune(amount: number) {
    this.synth.set('detune', (amount - 64) * 16);
  }

  adjustVibrato(amount: number) {
    this.vibrato.set('depth', (amount / 64));
  }

  adjustVolume(amount: number) {
    this.gain.set('gain', amount / 127);
  }
}

