import {Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Input} from '@angular/core';
import { GamePlayState, GamePlayMachine, Pattern } from '../../state-machine/game-play-machine';
import {Observable} from "rxjs";
@Component({
  selector: 'scoring-panel',
  template: `
    <div class="scoring">
      <h2>Score {{ currentScore }}</h2>
      <h3>YOU:  {{ receivedPattern }}</h3>
      <h3>Target: {{ pattern?.name }} ({{ pattern?.pattern }})</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoringPanelComponent implements AfterViewInit {
  @Input() gameState: Observable<GamePlayState>;
  currentScore: number;
  pattern: Pattern;
  receivedPattern: string;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    console.log('qsfdqwdf');
  }

  ngAfterViewInit() {
    const self = this;
    setTimeout(() => {
          self.gameState.subscribe(
      (newState: GamePlayState) => {
        self.currentScore = newState.currentScore;
        self.receivedPattern = newState.receivedPattern;
        self.pattern = newState.pattern;
        self.changeDetectorRef.markForCheck();
      }
    );
    });

  }
}
