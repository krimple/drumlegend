import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {
  GamePlayMachine, GamePlayState
} from '../state-machine';
import {Subscription} from 'rxjs';
import {Rudiment} from '../state-machine/rudiment';
@Component({
  selector: 'drum-pattern-info',
  template: `
    <div class="well">
      <h3 class="text-center">{{ rudiment?.name }} {{ rudiment?.visiblePattern }}</h3>
      <hr/>
      <p class="text-center">{{ rudiment?.description }}</p>
    </div>`
})
export class DrumPatternInfoComponent implements AfterViewInit, OnDestroy {

  rudiment: Rudiment;
  subscription: Subscription;

  constructor(private gamePlayMachine: GamePlayMachine) {
    const self = this;
    this.subscription = this.gamePlayMachine.gamePlayState.subscribe(
      (gamePlayState: GamePlayState) => {
        // console.log("got pattern info ", gamePlayState);
        self.rudiment = gamePlayState.rudiment;
      }
    );
   }

  ngAfterViewInit() {
 }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
