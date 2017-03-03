import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GamePlayState, GamePlayMachine, Pattern } from '../../state-machine/game-play-machine';
@Component({
  selector: 'scoring-panel',
  template: `
    <div class="scoring">
      <h2>Score {{ currentScore }}</h2>
      <h3>YOU:  {{ receivedPattern }}</h3>
      <h3>Target: {{ pattern.name }} ({{ pattern.pattern }})</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoringPanelComponent implements AfterViewInit {

  currentScore: number;
  pattern: Pattern;
  receivedPattern: string;

  constructor(private gamePlayMachine: GamePlayMachine, private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit() {
    const self = this;
    self.gamePlayMachine.gamePlayState.subscribe(
      (newState: GamePlayState) => {
        self.currentScore = newState.currentScore;
        self.receivedPattern = newState.receivedPattern;
        self.pattern = newState.pattern;
        self.changeDetector.detectChanges();
      }
    );
  }
}
