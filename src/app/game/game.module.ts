import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponentsModule } from './components';
import { ProgressMeterComponent } from './components';
import { GamePanelsModule } from './panels/game-panels.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    GameComponentsModule,
    GamePanelsModule
  ],
  exports: [
    ProgressMeterComponent,
    GameComponentsModule,
    GamePanelsModule
  ]
})
export class GameModule { }
