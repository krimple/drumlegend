import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {
  GamePlayMachine, GamePlayState,
} from '../state-machine';
import {Subscription} from 'rxjs';
@Component({
  selector: 'drum-stroke-info',
  template: `
    <div class="well">
         <h3 class="text-center">Last Note</h3>
         <h1 class="text-center">{{ lastNote }}</h1>
         <h3 class="text-center">Your strokes</h3>
         <h2 class="text-center">{{ gamePlayState?.receivedPattern }}</h2>
    </div>`
})
export class DrumStrokeInfoComponent implements AfterViewInit, OnDestroy {

  lastNote: string;
  subscription: Subscription;
  gamePlayState: GamePlayState;
  constructor(private gamePlayMachine: GamePlayMachine) {

  }

  ngAfterViewInit() {
    const self = this;
    this.subscription = this.gamePlayMachine.gamePlayState.subscribe(
      (gamePlayState: GamePlayState) => {
        self.gamePlayState = gamePlayState;
        self.lastNote = gamePlayState.receivedPattern ?
                        gamePlayState.receivedPattern.charAt(gamePlayState.receivedPattern.length - 1) : '-';
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
