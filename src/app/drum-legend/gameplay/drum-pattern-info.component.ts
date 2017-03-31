import { Component, Input } from '@angular/core';
import { GamePlayState } from '../state-machine';

@Component({
  selector: 'drumlegend-pattern-info',
  template: `
    <div class="well">
      <h3 class="text-center">{{ gamePlayState?.rudiment?.name }} {{ gamePlayState?.rudiment?.visiblePattern }}</h3>
      <hr/>
      <p class="text-center">{{ gamePlayState?.rudiment?.description }}</p>
    </div>`
})
export class DrumPatternInfoComponent {

  @Input() gamePlayState: GamePlayState;
}
