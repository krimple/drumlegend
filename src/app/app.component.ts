import {Component, AfterViewInit, ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs';
import {SynthesizerService} from "ng-webaudio-synthesizer";

@Component({
  selector: 'drumlegend-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss']
})
export class AppComponent {
  // bootstrap the synth
  constructor(private synthService: SynthesizerService) { }
}

