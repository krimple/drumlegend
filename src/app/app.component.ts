import {Component, AfterViewInit, ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs';
import {SynthesizerService} from "ng-webaudio-synthesizer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor(private synthService: SynthesizerService) { }

  ngAfterViewInit() {
  }

}

