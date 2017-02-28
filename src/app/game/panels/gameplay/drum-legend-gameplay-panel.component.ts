import { Component } from '@angular/core';
@Component({
  selector: 'drum-legend-gameplay-panel',
  template: `
    <h2>Snare Drum</h2>
    <progress-meter [width]="50" [backgroundColor]="'blue'"></progress-meter>
  `
})
export class DrumLegendGameplayPanelComponent {}
