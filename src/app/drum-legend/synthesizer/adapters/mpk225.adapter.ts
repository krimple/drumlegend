import { Adapter } from './adapter';
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import { MidiMessage, MidiMessageType } from '../midi-message';
import * as Tone from 'tone';
import { DrumMachineService } from '../drum-machine.service';
@Injectable()
export class Mpk225Adapter extends Adapter {

  synth: any;
  vibrato: any;
  reverb: any;
  limiter: any;
  gain: any;

  constructor(private zone: NgZone) {
    super();
    this.reverb = new Tone.JCReverb(0.6).connect(Tone.Master);
    this.vibrato = new Tone.Vibrato(5, 0);
    this.gain = new Tone.Gain(1);
    this.limiter = new Tone.Limiter(1);
    this.synth = new Tone.PolySynth(8, Tone.AMSynth).chain(this.vibrato, this.reverb, this.gain, this.limiter, Tone.Master);

  }
  adapt(messageStream$: Observable<MidiMessage>, destination?: Subject<string>): void {
    const self = this;
    const mpkMessages = messageStream$
      .filter((message: MidiMessage) => message.deviceName === 'MPK225 Port A');

    // drum machine code separate from regular keyboard subscription
    mpkMessages.filter((message: MidiMessage) => message.channel === 9 && message.velocity > 0)
               .debounceTime(20).subscribe((message: MidiMessage) => {
      if (message.noteNumber === 41) {
        self.zone.run(() => {
          destination.next('right');
        });
      } else if (message.noteNumber === 40) {
        self.zone.run(() => {
          destination.next('left');
        });
      }
    });

    // keyboard messages
    mpkMessages.subscribe((message: MidiMessage) => {
      switch (message.messageType) {
        case MidiMessageType.VM_KEY_DOWN:
          if (message.channel === 0 ) {
              console.log(`Attacking note ${message.noteName}`);
              self.synth.triggerAttack(message.noteName, 0, 0.7 + (message.velocity / 127) * 0.3);
          }
          break;
        case MidiMessageType.VM_KEY_UP:
          if (message.channel === 0 && message.velocity === 0) {
              console.log(`Releasing note ${message.noteName}`);
              self.synth.triggerRelease(message.noteName);
          }
          break;
        case MidiMessageType.PITCHBEND:
          self.synth.set('detune', (message.messageRawData[2] - 64) * 16);
          break;
        case MidiMessageType.CONTROLS:
          switch (message.messageRawData[1]) {
            case 1:
              self.vibrato.set('depth', (message.messageRawData[2] / 64));
              break;
            case 7:
              const volume = (message.messageRawData[2] / 127);
              console.log('adjusting volume to', volume);
              self.gain.set('gain', volume);
              break;
          }
          break;
        }
        console.log(`MIDI message sent:  ${JSON.stringify(message.messageRawData)}`);
      });
  }
}
