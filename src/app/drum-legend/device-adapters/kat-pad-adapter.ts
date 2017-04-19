import { DeviceAdapter } from './device-adapter';
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import { MidiMessage, MidiMessageType } from '../synthesizer/midi-message';
import { DrumMachineAndGameHolderService } from './drum-machine-and-game-holder.service';

@Injectable()
export class KatPadAdapter extends DeviceAdapter {
  constructor(private zone: NgZone, private gameHolderService: DrumMachineAndGameHolderService) {
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
          self.gameHolderService.playLeft();
        }
        if (message.noteNumber === 50) {
          self.gameHolderService.playRight();
        }
      });

  }
}
