import { Component } from '@angular/core';
import { SynthNoteMessage, TriggerSample } from '../../synthesizer/models/synth-note-message';
import { PipelineService } from '../../synthesizer/services/pipeline/pipeline.service';

@Component({
  selector: 'game-container',
  styles: [
    'button { background-color: red; }',
    '.container { background-color: lightblue; color: black; }',
  ],
  template: `
    <div class="container">
      <scoring-panel></scoring-panel>
      <drum-legend-gameplay-panel></drum-legend-gameplay-panel>
      <div *ngIf="testing">
        <div>
          <button (click)="start()">Start</button> &nbsp;
          <button (click)="stop()">Stop</button>
        </div>
        <progress-meter *ngIf="testing"
          [width]="percentComplete"
          [height]="50"
          [backgroundColor]="'green'"></progress-meter>  
    </div>
          
  `
})
export class GameContainerComponent {
  testing = false;
  percentComplete = 0;
  cancel: any;

  constructor(private pipelineService: PipelineService) {
  }

  start() {
    const self = this;
    this.pipelineService.begin();
    this.pipelineService.synthStream$
      .filter((message: SynthNoteMessage) =>
      message instanceof TriggerSample)
      .subscribe((message: SynthNoteMessage) => {
        self.percentComplete = self.percentComplete < 100 ?
          Number(self.percentComplete.valueOf() + 1) : Number(0);
      });

    this.cancel = setInterval(() => {
      self.pipelineService.synthStream$.next(new TriggerSample('snare'));
    }, 500);
  }

  stop() {
    if (this.cancel) {
      this.percentComplete = 0;
      clearInterval(this.cancel);
      this.pipelineService.end();
    }
  }
}
