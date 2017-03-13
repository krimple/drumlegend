import {
  Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Input,
  OnChanges, SimpleChanges, OnDestroy, OnInit, NgZone
} from '@angular/core';
import {GamePlayState, GamePlayMachine} from '../state-machine';
import {PipelineService} from '../../../synthesizer/services/pipeline/pipeline.service';
import {
  SynthMessage,
  TriggerSample
} from '../../../synthesizer/models/synth-note-message';
import {Observable, Subscription} from "rxjs";
@Component({
  selector       : 'drum-legend-gameplay-panel',
  template       : `
    <div class="row" *ngIf="muteNotes">
      <h2 class="text-center" *ngIf="message">{{ message }}</h2>
    </div>

    <div class="row" *ngIf="!muteNotes">
      <div class="col-md-3">
        <div class="jumbotron">
          <scoring-panel></scoring-panel>
        </div>
      </div>
      <div class="col-md-9">
        <drum-stroke-info></drum-stroke-info>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <drum-pattern-info></drum-pattern-info>
      </div>
    </div>
  `,
  host           : {'(window:keydown)': 'interceptKey($event)'},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrumLegendGameplayPanelComponent implements OnInit, AfterViewInit, OnDestroy {
  debugMode = false;
  lastNote: string;
  gamePlayState: Observable<GamePlayState>;
  pipelineSubscription: Subscription;
  gamePlayStateSubscription: Subscription;
  muteNotes = false;

  message: String;

  constructor(public gamePlayMachine: GamePlayMachine,
              private pipelineService: PipelineService,
              private changeDetector: ChangeDetectorRef,
              private zone: NgZone) {
    this.gamePlayState = this.gamePlayMachine.gamePlayState;
  }

  ngOnInit() {
    const self = this;
    this.gamePlayStateSubscription = this.gamePlayState.subscribe(
      (state: GamePlayState) => {
        // console.log('got state change to main component', state);
        this.message = state.message;
        if (state.paused === true) {
          console.log('*** PAUSED ***');
          self.muteNotes = state.paused;
          console.log('restoring state momentarily');
          self.zone.run(() => {
            setTimeout(() => {
              self.gamePlayMachine.resume();
              self.changeDetector.markForCheck();
              self.muteNotes = false;
            }, 3000);
          });
        }
      });
  }

  interceptKey($event: KeyboardEvent) {
    console.log('key is', $event.key);
    if ($event.key === 'd') {
      this.debugMode = !this.debugMode;
    }
    if ($event.key === 'l' || $event.key === 'L' || $event.key === 'ArrowLeft') {
      this.sendStroke('L');
    }
    if ($event.key === 'r' || $event.key === 'R' || $event.key === 'ArrowRight') {
      this.sendStroke('R');
    }
    if ($event.key === 'Escape') {
      this.gamePlayMachine.resetGame();
    }
    if ($event.key === 'p') {
      this.gamePlayMachine.pauseForMessages();
    }
  }

  sendStroke(stroke) {
    const self = this;
    if (self.muteNotes) {
      return;
    }

    if (stroke === 'L' || stroke === 'l') {
      this.pipelineService.synthStream$.next(new TriggerSample('snare', 255));
      self.changeDetector.detectChanges();
    } else if (stroke === 'R' || stroke === 'r') {
      this.pipelineService.synthStream$.next(new TriggerSample('bass', 255));
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
    this.pipelineSubscription = this.pipelineService.synthStream$
                                    .filter((message: SynthMessage) => message instanceof TriggerSample)
                                    .subscribe((sample: TriggerSample) => {
                                      // pause detect
                                      if (sample.instrument === 'snare' && !self.muteNotes) {
                                        self.lastNote = 'L';
                                        self.gamePlayMachine.sendStroke('L');
                                        self.changeDetector.detectChanges();
                                        self.lastNote = 'L';
                                      } else if (sample.instrument === 'bass' && !self.muteNotes) {
                                        self.lastNote = 'R';
                                        self.gamePlayMachine.sendStroke('R');
                                        self.changeDetector.detectChanges();
                                      }
                                    });
  }

  ngOnDestroy() {
    this.gamePlayStateSubscription.unsubscribe();
    this.pipelineSubscription.unsubscribe();
  }

  setPattern(name, pattern) {
    this.gamePlayMachine.setPattern(name, pattern);
  }

}
