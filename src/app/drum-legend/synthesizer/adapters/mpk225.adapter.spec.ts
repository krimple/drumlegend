import {Mpk225Adapter} from "./mpk225.adapter";
import createSpy = jasmine.createSpy;
import {NgZone} from "@angular/core";
import {getTestBed, inject, tick, TestBed, fakeAsync} from "@angular/core/testing";
import {Observable, Subject, ReplaySubject} from "rxjs";
import {DeviceCategory, MidiMessage} from "../midi-message";
import {CommonModule} from "@angular/common";
describe('MPK 225 Adapter', () => {
  let ngZone: NgZone;
  let mpk225Adapter: Mpk225Adapter;

  beforeEach(() => {
   ngZone = jasmine.createSpyObj('ngZone', ['run']);
   TestBed.configureTestingModule({
     imports: [
       CommonModule
     ],
     providers: [
       Mpk225Adapter
     ]});
   ngZone = getTestBed().get(NgZone);
   mpk225Adapter = getTestBed().get(Mpk225Adapter);
  });

  it('should react to left and right messages', fakeAsync(() => {
    expect(ngZone).toBeDefined();
    const midiMessage$: Subject<MidiMessage> = new Subject<MidiMessage>();

    const messages = new ReplaySubject<string>(2);
    let data= [];
    const subscription = messages.subscribe(
      (datum) => {
        console.log('got data', datum);
        data.push(datum);
      },
      (error) => {
        throw new Error(error);
      },
      () => {
        console.log('subscription complete');
      }
    );
    mpk225Adapter.adapt(midiMessage$, messages);
    midiMessage$.next(new MidiMessage('MPK225 Port A', '1', DeviceCategory.DRUMSET, { data: [153, 40, 10]}));
    midiMessage$.next(new MidiMessage('MPK225 Port A', '1', DeviceCategory.DRUMSET, { data: [153, 41, 10]}));
    tick(1000);
    console.log(`data is ${data}`);
    expect(data.length).toBe(2);
  }));

  it('should properly adapt left and right messages', () => {

  });
});
