import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { GamePlayState, } from '../state-machine';

@Component({
  selector: 'drumlegend-stroke-info',
  template: `
    <div class="well">
        <div class="row">
         <div class="col-xs-4"><span class="playedPatternTitle">YOU</span></div>
         <div class="col-xs-1"></div>
         <div class="col-xs-7">
            <span class="noteHistory">{{ gamePlayState?.displayedPattern}}</span>
         </div>
        </div>
        <div class="row">
         <div class="col-xs-4"><span class="playedPatternTitle">PATTERN</span></div>
         <div class="col-xs-1"></div>
         <div class="col-xs-7">
            <span class="upcoming-notes">{{ gamePlayState.rudiment.visiblePattern }}</span>
         </div>
        </div>
     </div>`,
    styleUrls: ['./drum-stroke-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrumStrokeInfoComponent {
  @Input() gamePlayState: GamePlayState;

  playedPatternMinusLastNote: string;
  playedLastNote: string;
  patternMinusLastNote: string;
  upcomingNotes: string;
  lastNote: string;

  /*
  ngOnInit() {
    const self = this;
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

    */
}
