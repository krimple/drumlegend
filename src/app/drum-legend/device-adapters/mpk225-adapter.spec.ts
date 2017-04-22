import {CommonModule} from '@angular/common';
import {Mpk225Adapter} from './mpk225-adapter';
import createSpy = jasmine.createSpy;
import {getTestBed, tick, TestBed, fakeAsync} from '@angular/core/testing';
import {Subject, ReplaySubject} from 'rxjs';
import {DeviceCategory, MidiMessage} from '../synthesizer/midi-message';
import createSpyObj = jasmine.createSpyObj;
import { SynthesizerService } from '../synthesizer/synthesizer.service';
describe('MPK 225 Adapter', () => {
  let mpk225Adapter: Mpk225Adapter;
  let midiMessage$: Subject<MidiMessage>;
  let synthesizerService: SynthesizerService;

  beforeEach(() => {
     midiMessage$ = new Subject<MidiMessage>();
   // fake out synth service if called
    synthesizerService = createSpyObj('SynthesizerService',
     ['init', 'playNote', 'stopNote', 'detune', 'adjustVibrato', 'adjustVolume']);
   TestBed.configureTestingModule({
     imports: [
       CommonModule
     ],
     providers: [
       { provide: SynthesizerService, useValue: synthesizerService },
       Mpk225Adapter
     ]});
   mpk225Adapter = getTestBed().get(Mpk225Adapter);
  });

  it('should react to Drumset MIDI input with output left and right messages', fakeAsync(() => {
    const messages$ = new ReplaySubject<string>(2);
    const data: string[] = [];
    const subscription = messages$.subscribe(
      (datum: string) => {
        data.push(datum);
      },
      (error) => {
        throw new Error(error);
      },
      () => {
        console.log('subscription complete');
      }
    );
    mpk225Adapter.adapt(midiMessage$, messages$);
    midiMessage$.next(new MidiMessage('MPK225 Port A', '1', DeviceCategory.DRUMSET, { data: [153, 40, 10]}));
    tick(1000);
    midiMessage$.next(new MidiMessage('MPK225 Port A', '1', DeviceCategory.DRUMSET, { data: [153, 41, 10]}));
    tick(1000);
    expect(data.length).toBe(2);
    expect(data).toEqual(['left', 'right']);
  }));

  it('should trigger note on for channel 0', fakeAsync(() => {
    mpk225Adapter.adapt(midiMessage$);
    midiMessage$.next(new MidiMessage('MPK225 Port A', '1', DeviceCategory.DRUMSET, { data: [144, 22, 60]}));
    tick(1000);
    expect(synthesizerService.playNote).toHaveBeenCalledWith('A#1', 60);
  }));

  it('should trigger note off for channel 0', fakeAsync(() => {
    mpk225Adapter.adapt(midiMessage$);
    midiMessage$.next(new MidiMessage('MPK225 Port A', '1', DeviceCategory.DRUMSET, { data: [128, 22, 0]}));
    tick(1000);
    expect(synthesizerService.stopNote).toHaveBeenCalledWith('A#1');
  }));

  it('should trigger pitch bend', fakeAsync(() => {
    mpk225Adapter.adapt(midiMessage$);
    midiMessage$.next(new MidiMessage('MPK225 Port A', '1', DeviceCategory.DRUMSET, { data: [224, 0, 90]}));
    tick(1000);
    expect(synthesizerService.detune).toHaveBeenCalledWith(90);
  }));

  it('should trigger mod wheel', fakeAsync(() => {
    mpk225Adapter.adapt(midiMessage$);
    midiMessage$.next(new MidiMessage('MPK225 Port A', '1', DeviceCategory.DRUMSET, { data: [176, 1, 90]}));
    tick(1000);
    expect(synthesizerService.adjustVibrato).toHaveBeenCalledWith(90);
  }));

  it('should adjust volume', fakeAsync(() => {
    mpk225Adapter.adapt(midiMessage$);
    midiMessage$.next(new MidiMessage('MPK225 Port A', '1', DeviceCategory.DRUMSET, { data: [176, 7, 90]}));
    tick(1000);
    expect(synthesizerService.adjustVolume).toHaveBeenCalledWith(90);
  }));
});
