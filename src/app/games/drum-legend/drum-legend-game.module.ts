import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressMeterComponent } from '../shared/progress-meter/progress-meter.component';
import {DrumLegendComponent} from './drum-legend.component';
import {SynthesizerModule} from '../../synthesizer/synthesizer.module';
import {DrumLegendGameplayPanelComponent} from './gameplay/drum-legend-gameplay-panel.component';
import {ScoringPanelComponent} from './gameplay/scoring/scoring-panel.component';
import {GamePlayMachine} from './state-machine/game-play-machine';
import {StateMachineModule} from './state-machine/state-machine-module';
import {FormsModule} from '@angular/forms';
import {DrumPatternInfoComponent} from './gameplay/drum-pattern-info.component';
import {DrumStrokeInfoComponent} from './gameplay/drum-stroke-info.component';

@NgModule({
  declarations: [
    DrumLegendComponent,
    DrumLegendGameplayPanelComponent,
    ScoringPanelComponent,
    DrumPatternInfoComponent,
    DrumStrokeInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SynthesizerModule,
    StateMachineModule
  ],
  exports: [
    DrumLegendComponent,
  ],
  providers: [
    GamePlayMachine
  ]
})
export class DrumLegendGameModule { }
