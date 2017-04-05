import {GamePlayState} from '../state-machine/state-definitions/game-play-state';
import {Component, Input} from '@angular/core';
@Component({
  selector: 'drumlegend-game-over',
  styles: [
    `span.section-title {
       font-size: 4em;
       color: #FFFFFF;
       font-weight: bold;
     }`
  ],
  template: `
  <div class="jumbotron">
    <h1>Game over!</h1>
    <hr/>
    <div class="well">
      <div class="row">
        <div class="col-xs-6"><span class="score">Final Score</span></div>
        <div class="col-xs-6"><span class="score-value">{{ gamePlayState?.totalScore}}</span></div>
      </div>
      <hr/>
          <div class="row">
            <div class="col-xs-12">
                <span class="section-title">Level Scores</span>      
            </div>
          </div>
       <div *ngFor="let level of gamePlayState.scoreLog">
          <div class="row">
            <div class="col-xs-12">
                <span class="score">Rudiment - {{ level.rudiment.name }}</span>      
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12"><span class="score-value">{{ level.matches }}, for {{ level.levelScore }} points.</span></div>
          </div>
      </div>
    </div>
  </div>
  `
})
export class GameOverComponent {
  @Input() gamePlayState: GamePlayState;
};
