import {Component, Input} from '@angular/core';
import { SynthNoteMessage, TriggerSample } from '../../synthesizer/models/synth-note-message';
import { PipelineService } from '../../synthesizer/services/pipeline/pipeline.service';
import {GamePlayState} from "../state-machine/game-play-machine";
import {Observable} from "rxjs";

@Component({
  selector: 'game-container',
  styles: [
    'button { background-color: red; }',
    '.container { background-color: lightblue; color: black; }',
  ],
  template: `
    <div class="container">
      <scoring-panel [gameState]="gamePlayState"></scoring-panel>
      <drum-legend-gameplay-panel [gamePlayState]="gamePlayState"></drum-legend-gameplay-panel>
    </div>
  `
})
export class GameContainerComponent {
  @Input() gamePlayState: Observable<GamePlayState>;
}
