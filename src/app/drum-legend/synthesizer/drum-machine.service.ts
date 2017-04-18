import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import * as Tone from 'tone';
import { GamePlayMachine } from '../state-machine';

@Injectable()
export class DrumMachineService {
  drumStrokeStream$: Subject<string> = new Subject<string>();

  leftBuffer = new Tone.Sampler('./assets/drums/short-snare.wav', () => {
    const self = this;
    this.drumStrokeStream$
      .filter((data: string) => {
        return data === 'left';
      }).subscribe(() => {
      self.gamePlayMachine.sendStroke('L');
      self.leftBuffer.triggerAttackRelease();
    });
  }).toMaster();

  rightBuffer = new Tone.Sampler('./assets/drums/hi-tom-normal.wav', () => {
    const self = this;
    this.drumStrokeStream$
      .filter((data: string) => {
        return data === 'right';
      }).subscribe(() => {
      self.gamePlayMachine.sendStroke('R');
      self.rightBuffer.triggerAttackRelease();
    });
  }).toMaster();

  constructor(private gamePlayMachine: GamePlayMachine) {
    // debugging the tone library
    window['Tone'] = Tone;
  }

  triggerStroke(stroke: string) {
    this.drumStrokeStream$.next(stroke);
  }
}

