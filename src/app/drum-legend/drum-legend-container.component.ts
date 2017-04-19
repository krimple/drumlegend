import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GamePlayMachine, GamePlayState } from './state-machine';
import { DrumMachineService, MidiInputProcessorService } from './synthesizer';
import { KatPadAdapter, Mpk225Adapter } from './device-adapters';
import { Subject } from 'rxjs';
@Component({
  selector: 'drumlegend-container',
  template: `
    <div id="content-contaner">
      <drumlegend-main [gamePlayState]="gamePlayState$ | async"> </drumlegend-main>
    </div>
  `
})
export class DrumLegendContainerComponent {
  gamePlayState$: Observable<GamePlayState>;

  drumStrokeStream$: Subject<string> = new Subject<string>();

  constructor(private midiInputProcessorService: MidiInputProcessorService,
              private drumMachineService: DrumMachineService,
              mpk225adapter: Mpk225Adapter,
              katPadAdapter: KatPadAdapter,
              gamePlayMachine: GamePlayMachine) {

    this.gamePlayState$ = gamePlayMachine.gamePlayState;
    this.drumMachineService.initStream(this.drumStrokeStream$);

    mpk225adapter.adapt(midiInputProcessorService.dataStream$, this.drumStrokeStream$);
    katPadAdapter.adapt(this.midiInputProcessorService.dataStream$, this.drumStrokeStream$);
  }
}
