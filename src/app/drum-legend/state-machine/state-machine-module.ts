import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './actions/game-effects';
import { gamePlayReducer } from './reducers/game-play-reducer';
import { GamePlayMachine } from './game-play-machine';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const store = StoreModule.provideStore({ gamePlay: gamePlayReducer });

@NgModule({
  imports: [
    store,
    EffectsModule.run(GameEffects),
    StoreDevtoolsModule.instrumentStore()
  ]
})
export class StateMachineModule {
  // Provides the module and creates the providers (services) in the PARENT instead of the child
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StateMachineModule,
      providers: [GamePlayMachine]
    };
  }
}
