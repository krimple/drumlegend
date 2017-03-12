import {Component, AfterViewInit, ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs';
import { PipelineService } from './synthesizer/services/pipeline/pipeline.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor(private pipelineService: PipelineService) { }

  ngAfterViewInit() {
    this.pipelineService.begin();
  }

}

