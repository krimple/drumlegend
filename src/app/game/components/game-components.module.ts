import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressMeterComponent } from './progress-meter/progress-meter.component';
import { SynthesizerModule } from '../../synthesizer/synthesizer.module';
import { GameContainerComponent } from '../container/game-container.component';

@NgModule({
  declarations: [
   ProgressMeterComponent
  ],
  imports: [
    CommonModule,
    SynthesizerModule
  ],
  exports: [
    ProgressMeterComponent
  ]
})
export class GameComponentsModule { }


