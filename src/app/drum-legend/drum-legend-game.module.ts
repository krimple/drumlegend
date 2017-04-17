import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DrumLegendComponent} from './drum-legend.component';
import {SynthesizerModule} from 'ng-webaudio-synthesizer';
import {GamePlayMachine} from './state-machine/game-play-machine';
import {StateMachineModule} from './state-machine/state-machine-module';
import {FormsModule} from '@angular/forms';
import { DrumMachineService } from './midi-input/drum-machine.service';
import {DrumLegendContainerComponent} from './drum-legend-container.component';

@NgModule({
  declarations: [
    DrumLegendContainerComponent,
    DrumLegendComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SynthesizerModule,
    StateMachineModule
  ],
  exports: [
    DrumLegendContainerComponent
  ],
  providers: [
    GamePlayMachine,
    DrumMachineService
  ]
})
export class DrumLegendGameModule { }
