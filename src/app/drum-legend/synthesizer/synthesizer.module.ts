import { NgModule } from '@angular/core';
import { AdaptersModule } from './adapters/adapter.module';
import { MidiInputProcessorService } from './midi-input-processor.service';
@NgModule({
  imports: [
    AdaptersModule
  ],
  providers: [
    MidiInputProcessorService
  ]
})
export class SynthesizerModule { }
