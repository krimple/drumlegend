import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as Tone from 'tone';
import { GamePlayMachine } from '../state-machine';

@Injectable()
export class DrumMachineService {
  drumStrokeStream$: Subject<string>;

  gain = new Tone.Gain( { gain: 10 });
  leftBuffer = new Tone.Sampler('./assets/drums/short-snare.wav', () => {
    const self = this;
    this.drumStrokeStream$
      .filter((data: string) => {
        return data === 'left';
      }).subscribe(() => {
      self.triggerStroke('L');
      self.leftBuffer.triggerAttackRelease();
    });
  });

  rightBuffer = new Tone.Sampler('./assets/drums/hi-tom-normal.wav', () => {
    const self = this;
    this.drumStrokeStream$
      .filter((data: string) => {
        return data === 'right';
      }).subscribe(() => {
      self.triggerStroke('R');
      self.rightBuffer.triggerAttackRelease();
    });
  });

  constructor() {
    this.leftBuffer.chain(this.gain, Tone.Master);
    this.rightBuffer.chain(this.gain, Tone.Master);

  }

  initStream(drumStrokeStream$: Subject<string>) {
   this.drumStrokeStream$ = drumStrokeStream$;
  }

  triggerStroke(stroke: string) {
    this.drumStrokeStream$.next(stroke);
  }
}

