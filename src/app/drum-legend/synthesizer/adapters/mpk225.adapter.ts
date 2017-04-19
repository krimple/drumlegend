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
  gain: any;

  constructor(public zone: NgZone) {
    super();
    this.reverb = new Tone.JCReverb(0.6).connect(Tone.Master);
    this.vibrato = new Tone.Vibrato(5, 0);
    this.gain = new Tone.Gain(1);
    this.synth = new Tone.PolySynth(8, Tone.MonoSynth).chain(this.vibrato, this.reverb, this.gain, Tone.Master);

  }
  adapt(messageStream$: Observable<MidiMessage>, destination?: Subject<string>): void {
    const self = this;
    const mpkMessages = messageStream$
      .filter((message: MidiMessage) => message.deviceName === 'MPK225 Port A');

    // drum machine code separate from regular keyboard subscription
    mpkMessages.filter((message: MidiMessage) => message.channel === 9 && message.velocity > 0)
               .debounceTime(20).subscribe((message: MidiMessage) => {
      let stroke;
      switch (message.noteNumber) {
        case 41: stroke = 'right'; break;
        case 40: stroke = 'left'; break;
      }
      if (stroke) {
        self.zone.run(() => {
          destination.next(stroke);
        });
      }
    });

    // keyboard messages
    mpkMessages.subscribe((message: MidiMessage) => {
      switch (message.messageType) {
        case MidiMessageType.VM_KEY_DOWN:
          if (message.channel === 0 ) {
            setTimeout(function () {
              self.synth.triggerAttack(message.noteName, 0, 0.7 + (message.velocity / 127) * 0.3);
            }, 0);
          }
          break;
        case MidiMessageType.VM_KEY_UP:
          if (message.channel === 0 && message.velocity === 0) {
            setTimeout(function() {
              self.synth.triggerRelease(message.noteName);
            }, 0);
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
              const volume = 6 * (message.messageRawData[2] / 127);
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
