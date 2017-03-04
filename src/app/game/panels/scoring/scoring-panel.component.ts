import {Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Input} from '@angular/core';
import { GamePlayState, GamePlayMachine, Pattern } from '../../state-machine/game-play-machine';
import {Observable} from "rxjs";
@Component({
  selector: 'scoring-panel',
  template: `
    <div class="scoring">
      <span id="scoreLabel">SCORE:</span>
      <span id="score">{{ currentScore }}</span>
    </div>
    <div class="monitor">
      <div id="received">
        <span id="receivedLabel">YOU:</span>
        <span id="receivedPattern">{{ receivedPattern }}</span>
      </div>
      <div id="target">
        <span id="targetLabel">Target:</span> 
        <span id="targetName">{{ pattern?.name }}</span>
        <span id="targetPattern">({{ pattern?.pattern }})</span>
      </div>
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
