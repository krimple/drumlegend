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
    <div id="content-container"> 
      <div id="game-play-container" *ngIf="gamePlayState?.gameState !== gameStateEnum.FINAL_SCORE">
        <div id="info-bar">
          <h2 id="score">Score:{{gamePlayState?.totalScore}}</h2>
          <h2 id="timer">:{{gamePlayState?.timeLeft}} Secs</h2>
        </div>
        <div id="input-container">
          <div class="user">
            <h2>You:</h2>
          </div>
            <h2>{{ gamePlayState?.displayedPattern }}</h2>
        </div>
        <div id="divider"></div>
        <div id="pattern-container">
          <div class="user">
          <h2>Pattern:</h2> 
          </div>
          <h2>{{ gamePlayState?.rudiment?.visiblePattern }}</h2>
        </div>
        
        <div id="level-info">
          <h3>Level {{ gamePlayState?.rudimentId + 1}}</h3>
          <h3>{{ gamePlayState?.rudiment?.name }}</h3>
          <h3>{{ gamePlayState?.rudiment?.visiblePattern }}</h3>
          <hr>
          <p>{{ gamePlayState?.rudiment?.description}}</p>
        </div>
      </div>
      <div id="game-play-container" *ngIf="gamePlayState?.gameState === gameStateEnum.FINAL_SCORE">
        <div id="info-bar">
          <h2 id="score">Game over!</h2>
        </div>
        <div id="level-info">
          <h3>Final Score:{{ gamePlayState.totalScore | number }}</h3>
          <hr>
          <div *ngFor="let level of gamePlayState.scoreLog">
            <h3>
               Rudiment - {{ level.rudiment.name }}</h3> 
            <h4>
               {{ level.matches }} matches 
               for {{ level.levelScore | number }} points.
            </h4>
          </div>
        </div>
      </div>
      <div id="sidebar">
        <img src="assets/drum-legend-app-splash-art.jpg">
        <h3>Drum Legend</h3>
      </div>
    </div>
  `,
  styleUrls: [
    './drum-legend.component.scss'
  ],
  host: {'(window:keydown)': 'interceptKey($event)'},
})
export class DrumLegendComponent implements OnInit {
  @Input() gamePlayState: GamePlayState;
  // to access the enum in the template
  gameStateEnum = GameState;
  constructor(stateMachine: GamePlayMachine,
              private gamePlayMachine: GamePlayMachine,
              private synthService: SynthesizerService) {
    gamePlayMachine.play();
  }

  ngOnInit() {
    const self = this;

    // TODO watch for muting
    // hook synth service into game
    // only snare and tom1 will generate strokes
    this.synthService.synthStream$
      .filter((message: SynthMessage) => message instanceof TriggerSample)
      .debounceTime(30)
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
    if ($event.key === 'Escape') {
      this.gamePlayMachine.resetGame();
    }
  }
}
