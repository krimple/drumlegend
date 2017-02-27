import {
  Component, AfterViewInit, ViewChild,
  ElementRef, Renderer, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges
} from '@angular/core';
import { PipelineService } from '../../../synthesizer/services/pipeline/pipeline.service';
import { SynthNoteMessage, TriggerSample } from '../../../synthesizer/models/synth-note-message';
@Component({
  selector: 'progress-meter',
  template: `
    <div class="box">
      <div #progress [style.height] = "height + 'px'"
                     [style.background-color]="backgroundColor"></div>
    </div> 
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  styles: [
   `.box {
      text-align: center;
      width: 80%;
      height: 100%;
      border: 1px solid black;
    }`
  ]
})
export class ProgressMeterComponent implements AfterViewInit, OnChanges {
  @Input() backgroundColor: string;
  @Input() width: number;
  @Input() height: number;
  @ViewChild('progress') progress: ElementRef;

  constructor(private renderer: Renderer) {
  }

  ngAfterViewInit() {
    const self = this;
    self.width = self.width < 100 ? Number(self.width.valueOf() + 1) : Number(0);
    self.renderer.setElementStyle(
      self.progress.nativeElement,
      'width',
      self.width + '%');
  }

  ngOnChanges(changes: SimpleChanges) {
    const self = this;
    const changeInWidth = changes['width'];
    if (changeInWidth) {
       self.renderer.setElementStyle(
            self.progress.nativeElement,
           'width',
            changeInWidth.currentValue + '%');
    }
  }
}
