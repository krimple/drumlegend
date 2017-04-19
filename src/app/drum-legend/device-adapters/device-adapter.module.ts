import { NgModule } from '@angular/core';
import { Mpk225Adapter } from './mpk225-adapter';
import { KatPadAdapter } from './kat-pad-adapter';
import { StateMachineModule } from '../state-machine/state-machine-module';
import { SynthesizerModule } from '../synthesizer/synthesizer.module';
import { DrumMachineAndGameHolderService } from './drum-machine-and-game-holder.service';
@NgModule({
  imports: [
    StateMachineModule,
    SynthesizerModule
  ],
  providers: [
    Mpk225Adapter,
    KatPadAdapter,
    DrumMachineAndGameHolderService
  ]
})
export class DeviceAdapterModule { }
