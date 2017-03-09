import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  SynthNoteOff, SynthNoteOn,
  VolumeChange, SynthMessage,
  WaveformChange, TriggerSample
} from '../../../models';

declare var navigator: any;

@Injectable()
export class ImprovedMidiInputService {

  deviceMappings: any = [
    { key: 'name', value: 'MPK225 Port A', type: 'midi'},
    { key: 'name', value: 'KMC MultiPad', type: 'percussion'},
    { key: 'name', value: 'Adafruit Bluefruit LE Bluetooth', type: 'midi'},
    { key: 'id', value: '167603758', type: 'percusson' },
    { key: 'id', value: '-1614721547', type: 'percussion'}, // MIDI Kat pad
    { key: 'id', value: '-1415071510', type: 'midi'},         // Bare Conductive
    { key: 'id', value: '1999784255', type: 'percussion'},  // MIDI Kat board
    { key: 'id', value: '0C2F7210E6038867BE36D163C7D8C2457143C8FA73EC54BD8F32417669F0B2C6', type: 'percussion'}
  ];

  subscriptions: any[] = [];
  subscribedDevices: any[] = [];

  // reference to pipeline's synth service stream
  private synthStream$: Subject<SynthMessage>;

  setup(synthStream$: Subject<SynthMessage>) {
    const self = this;
    // hold ref to synth note and control stream
    self.synthStream$ = synthStream$;

    navigator.requestMIDIAccess()
      .then(
        (access) => {
          console.dir(access);
          const iterator = access.inputs.values();
          const devices = [];
          while (true) {
            const next = iterator.next();
            if (next.done) {
              break;
            }
            devices.push(next.value);
          }
          console.log('devices available:');
          console.dir(devices);

          devices.forEach((device) => {
            const deviceInfo = this.deviceMappings.find((deviceMapping: any) => {
             return deviceMapping.value === device[deviceMapping.key];
            });
            if (deviceInfo) {
              self.subscribedDevices.push(deviceInfo);
              self.subscribe(device, deviceInfo);
            }
          });
        },
        (error) => {
          console.error('no MIDI access!');
          throw new Error('no MIDI Access. Are you on Chrome?');
        }
      );
  }

  subscribe(device, deviceInfo) {
    const self = this;
    console.log(`opening connection to ${device.name}`);
    device.open()
      .then((subscription) => {
        console.log('subscribed!');
        if (deviceInfo.type === 'midi') {
          self.startMusicNoteMessageDelivery(device, subscription);
        } else if (deviceInfo.type === 'percussion') {
          self.startPercussionDelivery(device, subscription, deviceInfo.percussion);
        }
      });
  }

  startMusicNoteMessageDelivery(device, subscription) {
    const self = this;
    console.log(`subscribing to midi messages from ${device.name}`);
    subscription.onmidimessage = (data) => {
      self.processMusicNoteMessage(data);
    };
    this.subscriptions.push(subscription);
  }

  startPercussionDelivery(device, subscription, instrument) {
    const self = this;
    console.log(`subscribing to percussion events for ${device.name} as instrument ${instrument}`);
    subscription.onmidimessage = (data) => {
      self.processPercussionMessage(data);
    };

    this.subscriptions.push(subscription);
  }

  stop() {
    const self = this;
    self.subscribedDevices.forEach((device) => {
      if (device.connected) {
        device.close();
      }
    });
    self.subscribedDevices.length = 0;
  }

  processMusicNoteMessage(midiChannelMessage: any) {
    console.log(`recieved: ${midiChannelMessage.data[0]}: ${midiChannelMessage.data[1]}: ${midiChannelMessage.data[2]}`);
    switch (midiChannelMessage.data[0]) {
      case 144:
        this.synthStream$.next(new SynthNoteOn(midiChannelMessage.data[1]));
        break;
      case 128:
        this.synthStream$.next(new SynthNoteOff(midiChannelMessage.data[1]));
        break;
      case 176:
        // first pot on synth
        if (midiChannelMessage.data[1] === 52) {
          this.synthStream$.next(new VolumeChange(midiChannelMessage.data[2]));
        }
        break;
      case 137:
        // buttons on drum pad on synth
        if (midiChannelMessage.data[1] === 36) {
          this.synthStream$.next(new WaveformChange(0));
        } else if (midiChannelMessage.data[1] === 37) {
          this.synthStream$.next(new WaveformChange(1));
        } else if (midiChannelMessage.data[1] === 38) {
          this.synthStream$.next(new WaveformChange(2));
        }
        break;
      default:
        console.log('unknown midiChannelMessage',
          midiChannelMessage.data[0],
          midiChannelMessage.data[1],
          midiChannelMessage.data[2]);
    }
  }

  processPercussionMessage(midiChannelMessage: any) {
    console.log(`recieved: ${midiChannelMessage.data[0]}: ${midiChannelMessage.data[1]}: ${midiChannelMessage.data[2]}`);
    if (/*midiChannelMessage.data[0] === 128  ||*/
    midiChannelMessage.data[0] === 153 &&
    midiChannelMessage.data[2] !== 0) {
      switch (midiChannelMessage.data[1]) {
        case 38:
          this.synthStream$.next(new TriggerSample('snare'));
          break;
        case 36:
          this.synthStream$.next(new TriggerSample('bass'));
          break;
        case 50:
          this.synthStream$.next(new TriggerSample('tom1'));
          break;
        case 51:
          this.synthStream$.next(new TriggerSample('tom2'));
          break;
        default:
          console.log('unknown drum');
      }
    } else {
      console.log('unknown drumset midiChannelMessage',
        midiChannelMessage.data[0],
        midiChannelMessage.data[1],
        midiChannelMessage.data[2]);
    }
  };
}
