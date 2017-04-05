import {Component, Input, OnChanges} from '@angular/core';
import {Stroke, MatchState} from '../../models/stroke';
@Component({
  selector: 'drumlegend-stroke',
  styles: [
    `
    .stroke-matched {
      color: blue;
    }
    .stroke-unmatched {
      color: red;
    }
    .stroke-not-evaled {
      color: white;
    }
    `
  ],
  template: `
      <span [ngClass]="{ 
        'stroke-matched': stroke.match === matchState.YES,
        'stroke-unmatched': stroke.match === matchState.NO,
        'stroke-not-evaled': stroke.match === matchState.PENDING }">
        {{stroke.hand}}
       </span>
  `
})
export class StrokeComponent {
  matchState = MatchState;
  @Input() stroke: Stroke;
}
