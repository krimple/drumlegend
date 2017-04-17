import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import * as Tone from 'tone';
import { GamePlayMachine } from '../state-machine';

@Injectable()
export class DrumMachineService {
  readonly drumStrokeStream$: Subject<string> = new Subject<string>();
  leftBuffer = new Tone.Sampler('./assets/drums/short-snare.wav', () => {
    const self = this;
    this.drumStrokeStream$
      .filter((data: string) => {
        return data === 'left';
      }).subscribe(() => {
      self.gamePlayMachine.sendStroke('L');
      self.leftBuffer.toMaster().triggerAttack();
    });
  });

  rightBuffer = new Tone.Sampler('./assets/drums/hi-tom-normal.wav', () => {
    const self = this;
    this.drumStrokeStream$
      .filter((data: string) => {
        return data === 'right';
      }).subscribe(() => {
      self.gamePlayMachine.sendStroke('R');
      self.rightBuffer.toMaster().triggerAttack();
    });
  });

  constructor(private gamePlayMachine: GamePlayMachine,
              private http: Http, private zone: NgZone) {
    // debugging the tone library
    window['Tone'] = Tone;
  }

  triggerStroke(stroke: string) {
    this.drumStrokeStream$.next(stroke);
  }
}

