import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponentsModule } from './components';
import { ProgressMeterComponent } from './components';
import { GamePanelsModule } from './panels/game-panels.module';
import { GameContainerComponent } from './container/game-container.component';

@NgModule({
  declarations: [
    GameContainerComponent
  ],
  imports: [
    CommonModule,
    GameComponentsModule,
    GamePanelsModule
  ],
  exports: [
    ProgressMeterComponent,
    GameComponentsModule,
    GamePanelsModule,
    GameContainerComponent
  ]
})
export class GameModule { }
