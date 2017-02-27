import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrumLegendGameplayPanelComponent } from './drum-legend-gameplay/drum-legend-gameplay-panel.component';
import { GameComponentsModule } from '../components/game-components.module';

@NgModule({
  declarations: [
    DrumLegendGameplayPanelComponent
  ],
  imports: [
    CommonModule,
    GameComponentsModule
  ],
  exports: [
    DrumLegendGameplayPanelComponent
  ]
})
export class  GamePanelsModule { }
