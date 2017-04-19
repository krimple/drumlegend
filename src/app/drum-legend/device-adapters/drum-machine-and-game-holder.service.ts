import { Injectable, NgZone } from '@angular/core';
import { DrumMachineService } from '../synthesizer/drum-machine.service';
import { GamePlayMachine } from '../state-machine/game-play-machine';
@Injectable()
export class DrumMachineAndGameHolderService {

  constructor(private ngZone: NgZone,
              private drumMachineService: DrumMachineService,
              private gamePlayMachine: GamePlayMachine) {
  }

  playLeft() {
    this.ngZone.run(() => {
      this.drumMachineService.triggerStroke('left');
      this.gamePlayMachine.sendStroke('L');
    });
  }

  playRight() {
    this.ngZone.run(() => {
      this.drumMachineService.triggerStroke('right');
      this.gamePlayMachine.sendStroke('R');
    });
  }
}
