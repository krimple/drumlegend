import { ModuleWithProviders, NgModule } from '@angular/core';
import { MidiInputProcessorService } from './midi-input-processor.service';
import { DrumMachineService } from './drum-machine.service';
import { SynthesizerService } from './synthesizer.service';
import { StateMachineModule } from '../state-machine/state-machine-module';
@NgModule({
  imports: [
    StateMachineModule
  ]
})
export class SynthesizerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SynthesizerModule,
      providers: [
        MidiInputProcessorService,
        DrumMachineService,
        SynthesizerService
      ]
    };
  }
}
