import {AfterViewInit, Component, OnDestroy, OnInit, ChangeDetectionStrategy,
        ChangeDetectorRef} from '@angular/core';
import {
  GamePlayMachine, GamePlayState,
} from '../state-machine';
import {Subscription} from 'rxjs';
@Component({
  selector: 'drum-stroke-info',
  template: `
    <div class="well">
        <div class="row">
         <div class="col-xs-4"><span class="playedPatternTitle">YOU</span></div>
         <div class="col-xs-1"></div>
         <div class="col-xs-7">
            <span class="noteHistory">{{ playedPatternMinusLastNote}}</span>
            <span class="lastNote">{{ playedLastNote }}</span>
         </div>
        </div>
        <div class="row">
         <div class="col-xs-4"><span class="playedPatternTitle">PATTERN</span></div>
         <div class="col-xs-1"></div>
         <div class="col-xs-7">
            <span class="upcoming-notes">{{ upcomingNotes }}</span>
         </div>
        </div>
     </div>`,
    styleUrls: ['./drum-stroke-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrumStrokeInfoComponent implements OnInit, OnDestroy {


  playedPatternMinusLastNote: string;
  playedLastNote: string;
  patternMinusLastNote: string;
  upcomingNotes: string;
  lastNote: string;
  subscription: Subscription;
  gamePlayState: GamePlayState;
  constructor(private gamePlayMachine: GamePlayMachine, private detector: ChangeDetectorRef) { }

  ngOnInit() {
    const self = this;
    this.subscription = this.gamePlayMachine.gamePlayState.subscribe(
      (gamePlayState: GamePlayState) => {
        self.gamePlayState = gamePlayState;
        if (!gamePlayState.paused) {
          const currentNotePosition = gamePlayState.receivedPattern.length;
          self.playedLastNote = gamePlayState.receivedPattern.charAt(currentNotePosition - 1);
          self.playedPatternMinusLastNote = gamePlayState.receivedPattern
                                                         .substring(0, currentNotePosition - 1);
          self.upcomingNotes = gamePlayState.rudiment.pattern;
        } else {
          self.playedLastNote = '';
          self.playedPatternMinusLastNote = '';
        }
       self.detector.markForCheck();
     }
    );
    self.detector.markForCheck();
  }

  ngOnDestroy() {
    console.log('destroying...');
    this.subscription.unsubscribe();
  }
}
