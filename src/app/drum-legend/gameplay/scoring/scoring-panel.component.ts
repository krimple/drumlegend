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
      <div class="col-xs-6"><span class="score">Total</span></div>
      <div class="col-xs-6"><span class="score-value">{{ gamePlayState?.totalScore}}</span></div>
    </div>
    <div class="row">
      <div class="col-xs-6"><span class="score">Level {{ gamePlayState?.rudimentId + 1}}</span></div>
      <div class="col-xs-6"><span class="score-value">{{ gamePlayState?.levelScore}}</span></div>
    </div>
    <div class="row">
      <div class="col-xs-6"><span class="score">Time Left</span></div>
      <div class="col-xs-6"><span class="score-value">{{ gamePlayState?.timeLeft }}</span></div>
    </div>
    <div class="row">
      <div class="col-xs-2"></div>
      <div class="col-xs-4 text-center"><span class="message">{{ gamePlayState.message }}</span></div>
    </div>
  `,
  styleUrls      : ['./scoring-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoringPanelComponent {
  @Input() gamePlayState: GamePlayState;
}
