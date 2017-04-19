import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { NgZone } from '@angular/core';
import { MidiMessage } from './midi-message';
import { Mpk225Adapter } from './adapters/mpk225-adapter';
import { Adapter } from './adapters/adapter';
import { KatPadAdapter } from './adapters/kat-pad-adapter';

export enum MidiServiceStates { ACTIVE, INACTIVE }

@Injectable()
export class MidiInputProcessorService {
  private state: MidiServiceStates = MidiServiceStates.INACTIVE;


  readonly dataStream$: Subject<MidiMessage> = new Subject<MidiMessage>();

  constructor(private http: Http,
              private zone: NgZone) {
    console.log('booting it dang it');
    console.log('bootstrapping input processor service');
    this.begin()
      .then(() => {
        console.log('stuff happened!');

      });
  }

  begin(): Promise<void> {
    const self = this;
    return new Promise<void>((resolve, reject) => {
      this.elaborateDevices().then(
        (devices) => {
          this.getConfiguration().then(
            (config: any) => {
              console.log('configuration fetched...');
              this.state = MidiServiceStates.ACTIVE;
              self.beginMidiInput(config, devices);
              resolve();
            },
            (error: any) => {
              console.log('error!', error);
              reject();
            });
        });
    });

  }

  private elaborateDevices(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return navigator['requestMIDIAccess']()
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
            console.log('devices elaborated');
            console.dir(devices);
            resolve(devices);
          },
          (error) => {
            console.dir(error);
            reject(`Midi Access request failed, ${error}`);
          });
    });
  }

  private getConfiguration(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('./assets/midi-device-mappings.json')
        .map((response) => response.json())
        .subscribe(
          (config: any[]) => {
            resolve(config);
          },
          (error) => {
            console.dir(error);
            reject(`Error loading mappings. ${error}`);
          });
    });
  }

  // reference to pipeline's synth service stream
  private beginMidiInput(config: any, activeDevices: any[] = null): Promise<any> {
    const self = this;
    return new Promise<any>((resolve, reject) => {
      activeDevices.forEach((activeDevice) => {
        const deviceInfo = config.find((configEntry: any) => {
          console.log(`comparing ${activeDevice[configEntry.key]} to ${configEntry.value}`);
          return activeDevice[configEntry.key] === configEntry.value;
        });
        if (deviceInfo) {
          self.subscribe(activeDevice, deviceInfo);
        }
      });
      if (self.state === MidiServiceStates.INACTIVE) {
        reject('Not listening for input. Start the service first.');
      } else {
        resolve('success');
      }
    });
  }

  private subscribe(device, deviceInfo) {
    console.log('subscribed!');
    const self = this;
    console.log(`opening connection to ${device.name}`);
    device.open()
      .then((subscription) => {
        subscription.onmidimessage = (data) => {
          setTimeout(() => {
             self.dataStream$.next(
              new MidiMessage(device.name, device.id, device.deviceCategory, data));
          }, 0);
       };
      });
  }

  /*
   case 176:
   // first pot on synth
   if (midiChannelMessage.data[1] === 7) {
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

   private processPercussionMessage(midiChannelMessage: any) {
   console.log(`recieved: ${midiChannelMessage.data[0]}: ${midiChannelMessage.data[1]}: ${midiChannelMessage.data[2]}`);
   if (midiChannelMessage.data[0] === 153 && midiChannelMessage.data[2] !== 0) {
   const velocity = midiChannelMessage.data[2];
   switch (midiChannelMessage.data[1]) {
   case 38:
   this.zone.run(() => {
   this.triggerSample('snare', velocity);
   });
   break;
   case 36:
   this.zone.run(() => {
   this.triggerSample('bass', velocity);
   });
   break;
   case 50:
   this.zone.run(() => {
   this.triggerSample('tom1', velocity);
   });
   break;
   case 51:
   this.zone.run(() => {
   this.triggerSample('tom2', velocity);
   });
   break;
   case 52:
   this.zone.run(() => {
   this.triggerSample('ride', velocity);
   });
   break;
   case 53:
   this.zone.run(() => {
   this.triggerSample('tom1', velocity);
   });
   break;

   default:
   console.log('unknown drum', midiChannelMessage.data[1]);
   }
   } else {
   console.log('unknown drumset midiChannelMessage',
   midiChannelMessage.data[0],
   midiChannelMessage.data[1],
   midiChannelMessage.data[2]);
   }
   }
   */
}

