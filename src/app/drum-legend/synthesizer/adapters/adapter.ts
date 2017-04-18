import { Injectable } from '@angular/core';
import { MidiMessage } from '../midi-message';
import { Observable, Subject } from 'rxjs';
@Injectable()
export abstract class Adapter {
  abstract adapt(messageStream$: Observable<MidiMessage>, destination: Subject<any>): void;
}
