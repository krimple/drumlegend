import {
  Component,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input, OnDestroy, OnInit
} from '@angular/core';
import {
  GamePlayState,
  GamePlayMachine
} from '../../state-machine';
import {Observable, Subscription} from "rxjs";
@Component({
  selector       : 'scoring-panel',
  template       : `
    <div class="row">
      <div class="col-xs-4"><span class="score">Score</span></div>
      <div class="col-xs-2"><span class="score-value">{{ gameState?.currentScore }}</span></div>
      <div class="col-xs-2"></div>
      <div class="col-xs-4 text-center"><span class="message">{{ gameState.message }}</span></div>
    </div>
  `,
  styleUrls      : ['./scoring-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoringPanelComponent implements OnInit, OnDestroy {
  gameState: GamePlayState;
  subscription: Subscription;
  currentScore: number;

  constructor(private gamePlayMachine: GamePlayMachine,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    const self = this;
    self.subscription = self.gamePlayMachine.gamePlayState.subscribe((state) => {
      self.gameState = state;
      self.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
