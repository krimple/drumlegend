import { Component } from '@angular/core';
import { GamePlayMachine, GamePlayState } from './game/state-machine/game-play-machine';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <game-container></game-container>
    <button (click)="setPattern('paradiddle', 'RLRRLRLL')">Set Paradiddle</button>
    <button (click)="sendStroke('L')">Left</button>
    <button (click)="sendStroke('R')">Right</button>
    <h2>Game play state</h2>
    <pre>{{ gamePlayMachine.gamePlayState | async | json }}</pre>
 `,

})
export class AppComponent {

  gamePlayState: GamePlayState;

  constructor(public gamePlayMachine: GamePlayMachine) {
    const self = this;
  }

  setPattern(name, pattern) {
    this.gamePlayMachine.setPattern(name, pattern);
  }

  sendStroke(value: string) {
    this.gamePlayMachine.sendStroke(value);
  }

}

