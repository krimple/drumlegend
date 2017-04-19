import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DrumLegendComponent } from './drum-legend.component';
import { SynthesizerModule } from './synthesizer';
import { StateMachineModule } from './state-machine';
import { DrumLegendContainerComponent } from './drum-legend-container.component';
import { DeviceAdapterModule } from './device-adapters/device-adapter.module';

@NgModule({
  declarations: [
    DrumLegendContainerComponent,
    DrumLegendComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    DeviceAdapterModule,
    SynthesizerModule.forRoot(),
    StateMachineModule.forRoot()
  ],
  exports: [
    DrumLegendContainerComponent
  ],
  providers: [
  ]
})
export class DrumLegendGameModule {
}
