import {
  Component, AfterViewInit, ViewChild,
  ElementRef, Renderer
} from '@angular/core';

import { PipelineService } from './synthesizer/services/pipeline/pipeline.service';
import { SynthNoteMessage, TriggerSample } from './synthesizer/models/synth-note-message';

@Component({
  selector: 'app-root',
  template: `
    <progress-meter 
      [width]="percentComplete"
      [height]="50"
      [backgroundColor]="'blue'"></progress-meter>
      <p></p>
     <progress-meter 
      [width]="percentComplete"
      [height]="50"
      [backgroundColor]="'red'"></progress-meter>      
      <p></p>
     <progress-meter 
      [width]="percentComplete"
      [height]="50"
      [backgroundColor]="'green'"></progress-meter>  
  `,

})
export class AppComponent implements AfterViewInit {
  percentComplete = 0;
  constructor(private pipelineService: PipelineService) {
  }

  ngAfterViewInit() {
    const self = this;
    this.pipelineService.begin();
    this.pipelineService.synthStream$
      .filter((message: SynthNoteMessage) =>
         message instanceof TriggerSample)
      .subscribe((message: SynthNoteMessage) => {
        self.percentComplete = self.percentComplete < 100  ? Number(self.percentComplete.valueOf() + 1) : Number(0);
      });

    setInterval(() => {
      self.pipelineService.synthStream$.next(new TriggerSample('snare'));
    }, 500);
  }
}
