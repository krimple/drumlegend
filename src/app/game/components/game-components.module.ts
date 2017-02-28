import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressMeterComponent } from './progress-meter/progress-meter.component';
import { SynthesizerModule } from '../../synthesizer/synthesizer.module';
import { GameContainerComponent } from './container/game-container.component';

@NgModule({
  declarations: [
   ProgressMeterComponent,
   GameContainerComponent
  ],
  imports: [
    CommonModule,
    SynthesizerModule
  ],
  exports: [
    ProgressMeterComponent,
    GameContainerComponent
  ]
})
export class GameComponentsModule { }
