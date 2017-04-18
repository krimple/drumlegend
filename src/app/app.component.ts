import {Component } from '@angular/core';
import { MidiInputProcessorService } from './drum-legend/synthesizer/midi-input-processor.service';

@Component({
  selector: 'drumlegend-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss']
})
export class AppComponent {
  constructor() { }
}

