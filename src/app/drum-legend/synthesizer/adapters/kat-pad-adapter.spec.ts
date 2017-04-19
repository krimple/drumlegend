import {KatPadAdapter} from './kat-pad-adapter';
import createSpy = jasmine.createSpy;
import {getTestBed, inject, tick, TestBed, fakeAsync} from '@angular/core/testing';
import {Subject, ReplaySubject} from 'rxjs';
import {DeviceCategory, MidiMessage} from '../midi-message';
import {CommonModule} from '@angular/common';

describe('Kat Pad Adapter', () => {
  let katPadAdapter: KatPadAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      providers: [
       KatPadAdapter
      ]});
    katPadAdapter = getTestBed().get(KatPadAdapter);
  });

  it('should react to left and right messages', fakeAsync(() => {
    const midiMessage$: Subject<MidiMessage> = new Subject<MidiMessage>();

    const messages$ = new ReplaySubject<string>(2);
    const data: string[] = [];
    const subscription = messages$.subscribe(
      (datum: string) => {
        data.push(datum);
      }
    );
    katPadAdapter.adapt(midiMessage$, messages$);
    midiMessage$.next(new MidiMessage('KMC MultiPad', '1', DeviceCategory.DRUMSET, { data: [144, 38, 10]}));
    tick(1000);
    midiMessage$.next(new MidiMessage('KMC MultiPad', '1', DeviceCategory.DRUMSET, { data: [144, 50, 10]}));
    tick(1000);
    expect(data.length).toBe(2);
    expect(data).toEqual(['left', 'right']);
  }));
});
