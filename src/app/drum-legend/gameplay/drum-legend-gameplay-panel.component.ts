import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {GamePlayState} from '../state-machine';
@Component({
  selector: 'drumlegend-gameplay-panel',
  template: `
    <div class="row">
      <div class="col-md-12">
        <div class="well">
          <drumlegend-scoring-panel [gamePlayState]="gamePlayState"></drumlegend-scoring-panel>
        </div>
      </div>
      <div class="col-md-12">
        <drumlegend-stroke-info [gamePlayState]="gamePlayState"></drumlegend-stroke-info>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <drumlegend-pattern-info [gamePlayState]="gamePlayState"></drumlegend-pattern-info>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrumLegendGameplayPanelComponent {
  @Input() gamePlayState: GamePlayState;
}

