import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DrumLegendComponent} from './drum-legend.component';
import {SynthesizerModule} from './synthesizer/synthesizer.module';
import {GamePlayMachine} from './state-machine/game-play-machine';
import {StateMachineModule} from './state-machine/state-machine-module';
import {FormsModule} from '@angular/forms';
import {DrumMachineService} from './synthesizer/drum-machine.service';
import {DrumLegendContainerComponent} from './drum-legend-container.component';
import { MidiInputProcessorService } from './synthesizer/midi-input-processor.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    DrumLegendContainerComponent,
    DrumLegendComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    SynthesizerModule,
    StateMachineModule
  ],
  exports: [
    DrumLegendContainerComponent
  ],
  providers: [
    GamePlayMachine,
    DrumMachineService,
    MidiInputProcessorService
  ]
})
export class DrumLegendGameModule { }
