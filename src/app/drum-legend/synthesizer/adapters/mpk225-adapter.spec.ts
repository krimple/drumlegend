import {Mpk225Adapter} from "./mpk225-adapter";
import createSpy = jasmine.createSpy;
import {NgZone} from "@angular/core";
import {getTestBed, inject, tick, TestBed, fakeAsync} from "@angular/core/testing";
import {Observable, Subject, ReplaySubject} from "rxjs";
import {DeviceCategory, MidiMessage} from "../midi-message";
import {CommonModule} from "@angular/common";
describe('MPK 225 Adapter', () => {
  let mpk225Adapter: Mpk225Adapter;

  beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [
       CommonModule
     ],
     providers: [
       Mpk225Adapter
     ]});
   mpk225Adapter = getTestBed().get(Mpk225Adapter);
  });

  it('should react to left and right messages', fakeAsync(() => {
    const midiMessage$: Subject<MidiMessage> = new Subject<MidiMessage>();

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
});
