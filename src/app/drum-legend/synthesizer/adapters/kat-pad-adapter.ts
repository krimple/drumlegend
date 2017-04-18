import { Adapter } from './adapter';
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import { MidiMessage, MidiMessageType } from '../midi-message';
import * as Tone from 'tone';
import { DrumMachineService } from '../drum-machine.service';
@Injectable()
export class KatPadAdapter extends Adapter {
  constructor(private zone: NgZone) {
    super();
  }
  adapt(messageStream$: Observable<MidiMessage>, destination?: Subject<string>): void {
    const self = this;

    messageStream$
      .filter((message: MidiMessage) => message.deviceName === 'KMC MultiPad' &&
                                        message.velocity > 0 &&
                                        message.messageType === MidiMessageType.VM_KEY_DOWN &&
                                       (message.noteNumber === 38 || message.noteNumber === 50))
      .debounceTime(10)
      .subscribe((message: MidiMessage) => {
          if (message.noteNumber === 38) {
            self.zone.run(() => {
                destination.next('left');
            });
          }
          if (message.noteNumber === 50) {
            self.zone.run(() => {
                destination.next('right');
          });
        }
      });

  }
}
