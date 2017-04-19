import { Injectable } from '@angular/core';
import { MidiMessage } from '../synthesizer/midi-message';
import { Observable, Subject } from 'rxjs';
@Injectable()
export abstract class DeviceAdapter {
  abstract adapt(messageStream$: Observable<MidiMessage>, destination: Subject<any>): void;
}
