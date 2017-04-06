import { Component, Input, OnInit, state, ViewEncapsulation } from '@angular/core';
import {GamePlayMachine, GameState, GamePlayState} from './state-machine';
import {Observable} from 'rxjs';
import 'rxjs/operator/debounceTime';
import { SynthesizerService,
         SynthMessage, SynthNoteOn,
  TriggerSample } from 'ng-webaudio-synthesizer';

@Component({
  selector: 'drumlegend-main',
  template: `
    <div class="container absolute-center" 
         *ngIf="gamePlayState$ | async; let gamePlayState">
      <div class="row title-row">
        <div class="col-md-12"><h1 class="app-title">Drum Legend</h1></div>
     </div>
      <div class="row">
        <div class="col-md-8"
                 *ngIf="gamePlayState?.gameState !== gameStateEnum.FINAL_SCORE">
          <drumlegend-gameplay-panel 
              [gamePlayState]="gamePlayState"
              (onPause)="stateMachine.pauseForMessages()"
              (onReset)="stateMachine.reset()"
              (onStroke)="stateMachine.sendStroke($event)"
          ></drumlegend-gameplay-panel>
        </div>
        <div class="col-md-8" 
           *ngIf="gamePlayState?.gameState === gameStateEnum.FINAL_SCORE">
           <drumlegend-game-over [gamePlayState]="gamePlayState"></drumlegend-game-over>
        </div>
         <div class="col-md-4">
          <img width="100%" src="assets/drum-legend-splash-resized.jpg">
        </div>
      </div>
    </div>
  `,
  styleUrls: [
    './drum-legend.component.scss'
  ],
  host: {'(window:keydown)': 'interceptKey($event)'},
})
export class DrumLegendComponent implements OnInit {
  gamePlayState$: Observable<GamePlayState>;
  // to access the enum in the template
  gameStateEnum = GameState;
  constructor(stateMachine: GamePlayMachine,
              private gamePlayMachine: GamePlayMachine,
              private synthService: SynthesizerService) {
    this.gamePlayState$ = stateMachine.gamePlayState;
    gamePlayMachine.play();
  }

  ngOnInit() {
    const self = this;

    // TODO watch for muting
    // hook synth service into game
    // only snare and tom1 will generate strokes
    this.synthService.synthStream$
      .filter((message: SynthMessage) => message instanceof TriggerSample)
      .debounceTime(100)
      .subscribe(
        (triggerSample: TriggerSample) => {
          switch (triggerSample.instrument) {
            case 'snare':
              this.gamePlayMachine.sendStroke('L');
              break;
            case 'tom1':
              this.gamePlayMachine.sendStroke('R');
              break;
          }
        }
      );
  }

  // for non-gamepad-connected play:
  // hook keystrokes into note generation. If a key is struck,
  // send it into the synth (which makes it observable above in the suscription
  // to the stream for trigger samples
  interceptKey($event: KeyboardEvent) {
    if ($event.key === 'l' || $event.key === 'L' || $event.key === 'ArrowLeft') {
      this.synthService.synthStream$.next(new TriggerSample('snare', 255));
    }
    if ($event.key === 'r' || $event.key === 'R' || $event.key === 'ArrowRight') {
      this.synthService.synthStream$.next(new TriggerSample('tom1', 255));
    }
    if($event.key === 'Escape') {
      this.gamePlayMachine.resetGame();
    }
  }
}
