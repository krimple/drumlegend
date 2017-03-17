import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './game-effects';
import { gamePlayReducer } from './game-play-reducer';
import { GamePlayMachine } from './game-play-machine';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const store = StoreModule.provideStore({ gamePlay: gamePlayReducer });

@NgModule({
  imports: [
    store,
    EffectsModule.run(GameEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 100
    })
  ],
  providers: [
    GamePlayMachine
  ],
  exports: [
  ]
})
export class StateMachineModule { }
