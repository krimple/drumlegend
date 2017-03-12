import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { gamePlayReducer } from './game-play-reducer';
import { GamePlayMachine } from './game-play-machine';

const store = StoreModule.provideStore({ gamePlay: gamePlayReducer });

@NgModule({
  imports: [
    store
  ],
  providers: [
    GamePlayMachine
  ],
  exports: [
  ]
})
export class StateMachineModule { }
