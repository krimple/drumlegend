import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import * as Tone from 'tone';
import { GamePlayMachine } from '../state-machine';

@Injectable()
export class DrumMachineService {
  drumStrokeStream$: Subject<string> = new Subject<string>();

  gain = new Tone.Gain( { gain: 10 });
  leftBuffer = new Tone.Sampler('./assets/drums/short-snare.wav', () => {
    const self = this;
    this.drumStrokeStream$
      .filter((data: string) => {
        return data === 'left';
      }).subscribe(() => {
      self.gamePlayMachine.sendStroke('L');
      self.leftBuffer.triggerAttackRelease();
    });
  });

  rightBuffer = new Tone.Sampler('./assets/drums/hi-tom-normal.wav', () => {
    const self = this;
    this.drumStrokeStream$
      .filter((data: string) => {
        return data === 'right';
      }).subscribe(() => {
      self.gamePlayMachine.sendStroke('R');
      self.rightBuffer.triggerAttackRelease();
    });
  });

  constructor(private gamePlayMachine: GamePlayMachine) {
    // debugging the tone library
    window['Tone'] = Tone;
    this.leftBuffer.chain(this.gain, Tone.Master);
    this.rightBuffer.chain(this.gain, Tone.Master);

  }

  triggerStroke(stroke: string) {
    this.drumStrokeStream$.next(stroke);
  }
}

