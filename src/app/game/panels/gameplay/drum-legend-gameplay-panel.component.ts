import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GamePlayState, GamePlayMachine } from '../../state-machine/game-play-machine';
import { PipelineService } from '../../../synthesizer/services/pipeline/pipeline.service';
import { SynthMessage, TriggerSample } from '../../../synthesizer/models/synth-note-message';
import { Sample } from '../../../synthesizer/models/sample';
@Component({
  selector: 'drum-legend-gameplay-panel',
  styles: [
    'button { color: blue; background-color: black; font-size: 3em; padding: 4px; }'
  ],
  template: `
    <h2>Snare Drum</h2>
    <div>
      <button (click)="sendStroke('L')">Left</button>
      <button (click)="sendStroke('R')">Right</button>
      
      
      <div *ngIf="debugMode">
        <h2>Game play state</h2>
        <pre>{{ gamePlayMachine.gamePlayState | async | json }}</pre>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrumLegendGameplayPanelComponent implements AfterViewInit {

  debugMode = true;
  gamePlayState: GamePlayState;

  constructor(public gamePlayMachine: GamePlayMachine,
              private pipelineService: PipelineService,
              private changeDetector: ChangeDetectorRef) {
  }

  sendStroke(stroke) {
    const self = this;
    if (stroke === 'L') {
      this.pipelineService.synthStream$.next(new TriggerSample('snare'));
      self.changeDetector.detectChanges();
    } else if (stroke === 'R') {
      this.pipelineService.synthStream$.next(new TriggerSample('bass'));
      self.changeDetector.detectChanges();
    }
  }

  ngAfterViewInit() {
    const self = this;

    // Subscribe to the pipeline and watch for notes
    // if the notes are snare, score a left stroke
    // if the notes are bass, score a right stroke
    // note we only subscribe to sample messages, so
    // a synthesizer can connect regardless.
    this.pipelineService.synthStream$
        .filter((message: SynthMessage) => message instanceof TriggerSample)
        .subscribe((sample: TriggerSample) => {
          if (sample.instrument === 'snare') {
              console.log('sending L');
              self.gamePlayMachine.sendStroke('L');
              self.changeDetector.detectChanges();
          } else if (sample.instrument === 'bass') {
            console.log('sending R');
            self.gamePlayMachine.sendStroke('R');
            self.changeDetector.detectChanges();
           }
        });
  }

  setPattern(name, pattern) {
    this.gamePlayMachine.setPattern(name, pattern);
  }

}
