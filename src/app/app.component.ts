import { Component, AfterViewInit } from '@angular/core';
import { GamePlayMachine } from './game/state-machine/game-play-machine';
import { Observable } from 'rxjs';
import { PipelineService } from './synthesizer/services/pipeline/pipeline.service';
import { SequencerService } from './synthesizer/services/pipeline/processors/sequencer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private pipelineService: PipelineService,
              public gamePlayMachine: GamePlayMachine,
              private sequencerService: SequencerService) {
    pipelineService.begin();
  }

  startRecording() {
    if (this.sequencerService.isStopped()) {
      this.sequencerService.record();
    }
  }

  stopRecording() {
    if (this.sequencerService.isRecording()) {
      this.sequencerService.stop();
    }
  }

  startPlayback() {
    if (this.sequencerService.isStopped()) {
      this.sequencerService.playback();
    }
  }

  setPattern(name, pattern) {
    this.gamePlayMachine.setPattern(name, pattern);
  }

  sendStroke(value: string) {
    this.gamePlayMachine.sendStroke(value);
  }

}

