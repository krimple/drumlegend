import {Component, Input, state, ViewEncapsulation} from '@angular/core';
import { SynthNoteMessage, TriggerSample } from '../../synthesizer/models/synth-note-message';
import { PipelineService } from '../../synthesizer/services/pipeline/pipeline.service';
import {GamePlayMachine, GamePlayState} from './state-machine';
import {Observable} from 'rxjs';

@Component({
  selector: 'drum-legend',
  template: `
    <div class="container">
      <div class="row title-row">
        <div class="col-xs-12"><h1>Drum Legend</h1></div>
      </div>
      <drum-legend-gameplay-panel></drum-legend-gameplay-panel>
    </div>
  `,
  styleUrls: [
    './drum-legend.component.scss'
  ]
})
export class DrumLegendComponent {
  gamePlayState: Observable<GamePlayState>;
  constructor(stateMachine: GamePlayMachine) {
    this.gamePlayState = stateMachine.gamePlayState;
  }
}
