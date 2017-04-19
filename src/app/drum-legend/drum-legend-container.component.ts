import {Component} from '@angular/core';
import {GamePlayMachine} from './state-machine/game-play-machine';
import {GamePlayState} from './state-machine/state-definitions/game-play-state';
import {Observable} from 'rxjs/Observable';
import { MidiInputProcessorService } from './synthesizer/midi-input-processor.service';
import { DrumMachineService } from './synthesizer/drum-machine.service';
import { Mpk225Adapter } from './synthesizer/adapters/mpk225-adapter';
import { KatPadAdapter } from './synthesizer/adapters/kat-pad-adapter';
@Component({
  selector: 'drumlegend-container',
  template: `
    <div id="content-container"> 
      <drumlegend-main [gamePlayState]="gamePlayState$ | async"></drumlegend-main>
    </div>
  `
})
export class DrumLegendContainerComponent {
  gamePlayState$: Observable<GamePlayState>;

  constructor(private midiInputProcessorService: MidiInputProcessorService,
              private drumMachineService: DrumMachineService,
              stateMachine: GamePlayMachine,
              mpk225adapter: Mpk225Adapter,
              katPadAdapter: KatPadAdapter) {
    this.gamePlayState$ = stateMachine.gamePlayState;

    mpk225adapter.adapt(midiInputProcessorService.dataStream$, drumMachineService.drumStrokeStream$);
    katPadAdapter.adapt(this.midiInputProcessorService.dataStream$, drumMachineService.drumStrokeStream$);
  }
}
