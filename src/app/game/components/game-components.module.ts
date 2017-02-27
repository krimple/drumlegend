import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressMeterComponent } from './progress-meter/progress-meter.component';

@NgModule({
  declarations: [
   ProgressMeterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProgressMeterComponent
  ]
})
export class GameComponentsModule { }
