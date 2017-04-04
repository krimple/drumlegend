import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy, OnInit, Input
} from '@angular/core';
import { GamePlayState } from '../../state-machine';

@Component({
  selector: 'drumlegend-scoring-panel',
  template: `
    <div class="row">
      <div class="col-xs-6"><span class="score">Total Score</span></div>
      <div class="col-xs-6"><span class="score-value">{{ gamePlayState?.totalScore}}</span></div>
    </div>
    <hr/>
    <div class="row">
      <div class="col-xs-6"><span class="section-title">Challenge</span></div>
    </div>
     <div class="row">
      <div class="col-xs-6"><span class="score">Matches</span></div>
      <div class="col-xs-6"><span class="score-value">{{ gamePlayState?.matches }}</span></div>
    </div>
     <div class="row">
      <div class="col-xs-6"><span class="score">Level {{ gamePlayState?.rudimentId + 1}}</span></div>
      <div class="col-xs-6"><span class="score-value">{{ gamePlayState?.levelScore}}</span></div>
    </div>
    <div class="row">
      <div class="col-xs-6"><span class="score">Time Left</span></div>
      <div class="col-xs-6"><span class="score-value">{{ gamePlayState?.timeLeft }}</span></div>
    </div>
 `,
  styleUrls      : ['./scoring-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoringPanelComponent {
  @Input() gamePlayState: GamePlayState;
}
