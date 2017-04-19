import { DeviceAdapter } from './device-adapter';
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import { MidiMessage, MidiMessageType } from '../synthesizer/midi-message';
import { SynthesizerService } from '../synthesizer/synthesizer.service';
import { GamePlayMachine } from '../state-machine/game-play-machine';
import { DrumMachineAndGameHolderService } from './drum-machine-and-game-holder.service';
@Injectable()
export class Mpk225Adapter extends DeviceAdapter {

  constructor(public zone: NgZone,
              private gameHolderService: DrumMachineAndGameHolderService,
              private synthesizerService: SynthesizerService) {
    super();
    synthesizerService.init();
  }

  adapt(messageStream$: Observable<MidiMessage>, destination?: Subject<string>): void {
    const self = this;
    const mpkMessages = messageStream$
      .filter((message: MidiMessage) => message.deviceName === 'MPK225 Port A');

    // drum machine code separate from regular keyboard subscription
    mpkMessages.filter((message: MidiMessage) => message.channel === 9
                                               && message.velocity > 0)
               .debounceTime(20).subscribe((message: MidiMessage) => {
      switch (message.noteNumber) {
        case 41:
          self.gameHolderService.playRight();
          break;
        case 40:
          self.gameHolderService.playLeft();
          break;
      }
    });

    // MIDI keyboard messages

    // note on
    mpkMessages.filter((message: MidiMessage) => message.channel === 0 &&
                                                 message.messageType === MidiMessageType.VM_KEY_DOWN)
      .subscribe((message: MidiMessage) => {
         self.synthesizerService.playNote(message.noteName, message.velocity);
      });


    // note off
    mpkMessages.filter((message: MidiMessage) => message.channel === 0 &&
                                                 message.messageType === MidiMessageType.VM_KEY_UP &&
                                                 message.velocity === 0)
      .subscribe((message: MidiMessage) => {
         self.synthesizerService.stopNote(message.noteName);
      });

    // detune (pitch bend)
    mpkMessages.filter((message: MidiMessage) => message.messageType === MidiMessageType.PITCHBEND)
      .subscribe((message: MidiMessage) => {
         self.synthesizerService.detune(message.messageRawData[2]);
      });

    // mod wheel / vibrato
    mpkMessages.filter((message: MidiMessage) => message.messageType === MidiMessageType.CONTROLS &&
                                                 message.messageRawData[1] === 1)
      .subscribe((message: MidiMessage) => {
        self.synthesizerService.adjustVibrato(message.messageRawData[2]);
      });

    // volume adjust
    mpkMessages.filter((message: MidiMessage) => message.messageType === MidiMessageType.CONTROLS &&
                                                 message.messageRawData[1] === 7)
       .subscribe((message: MidiMessage) => {
          self.synthesizerService.adjustVolume(message.messageRawData[2]);
      });
  }
}
