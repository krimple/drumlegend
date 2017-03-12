import {
  Component,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import {
  GamePlayState,
  GamePlayMachine
} from '../../state-machine';
import {Observable, Subscription} from "rxjs";
@Component({
  selector       : 'scoring-panel',
  template       : `
    <div>
      <h3 class="text-center">SCORE</h3>
      <h3 class="text-center">{{ gameState?.currentScore }}</h3>
    </div>
  `,
  styleUrls      : ['./scoring-panel.component.scss']
})
export class ScoringPanelComponent implements AfterViewInit {
  gameState: GamePlayState;
  subscription: Subscription;
  currentScore: number;

  constructor(private gamePlayMachine: GamePlayMachine,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    const self = this;
    self.gamePlayMachine.gamePlayState.subscribe((state) => {
      self.gameState = state;
    });
  }
}
