import {Component} from '@angular/core';
import {GamePlayMachine} from './state-machine/game-play-machine';
import {GamePlayState} from './state-machine/state-definitions/game-play-state';
import {Observable} from 'rxjs';
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

  constructor(stateMachine: GamePlayMachine) {
    this.gamePlayState$ = stateMachine.gamePlayState;
  }
}