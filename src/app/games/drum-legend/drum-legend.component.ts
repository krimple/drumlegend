import {Component, Input, state, ViewEncapsulation} from '@angular/core';
import {GamePlayMachine, GamePlayState} from './state-machine';
import {Observable} from 'rxjs';

@Component({
  selector: 'drum-legend',
  template: `
    <div class="container absolute-center">
      <div class="row title-row">
        <div class="col-md-12"><h1 class="app-title">Drum Legend</h1></div>
     </div>
      <div class="row">
        <div class="col-md-8">
          <drum-legend-gameplay-panel></drum-legend-gameplay-panel>
        </div>
        <div class="col-md-4">
          <img width="100%" src="assets/drum-legend-splash-resized.jpg">
        </div>
      </div>
     </div>
  `,
  styleUrls: [
    './drum-legend.component.scss'
  ]
})
export class DrumLegendComponent {
  gamePlayState: Observable<GamePlayState>;
  constructor(stateMachine: GamePlayMachine, gamePlayMachine: GamePlayMachine) {
    this.gamePlayState = stateMachine.gamePlayState;
    gamePlayMachine.play();
  }
}
